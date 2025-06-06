
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/components/layout/LanguageSwitcher';
import { useToast } from '@/components/ui/use-toast';

interface VoiceChatProps {
  roomId: string;
  userId: string;
  playerName: string;
}

interface PeerConnection {
  peerId: string;
  connection: RTCPeerConnection;
  audioElement?: HTMLAudioElement;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ roomId, userId, playerName }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [peers, setPeers] = useState<Map<string, PeerConnection>>(new Map());
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const channelRef = useRef<any>(null);

  // ICE服务器配置
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' }
    ]
  };

  // 初始化本地音频流
  const initializeLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      setLocalStream(stream);
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
        localAudioRef.current.muted = true; // 静音本地音频以避免回音
      }
      return stream;
    } catch (error) {
      console.error('获取麦克风权限失败:', error);
      toast({
        title: '麦克风权限错误',
        description: '无法获取麦克风权限，请检查浏览器设置',
        variant: 'destructive',
      });
      return null;
    }
  };

  // 创建新的peer连接
  const createPeerConnection = (peerId: string): RTCPeerConnection => {
    const pc = new RTCPeerConnection(iceServers);
    
    // 添加本地流
    if (localStream) {
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    // 处理远程流
    pc.ontrack = (event) => {
      const [remoteStream] = event.streams;
      const audioElement = new Audio();
      audioElement.srcObject = remoteStream;
      audioElement.autoplay = true;
      audioElement.play().catch(console.error);
      
      setPeers(prev => {
        const updated = new Map(prev);
        const existing = updated.get(peerId);
        if (existing) {
          existing.audioElement = audioElement;
          updated.set(peerId, existing);
        }
        return updated;
      });
    };

    // 处理ICE候选
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignalingMessage({
          type: 'ice-candidate',
          candidate: event.candidate,
          from: userId,
          to: peerId
        });
      }
    };

    return pc;
  };

  // 发送信令消息
  const sendSignalingMessage = async (message: any) => {
    try {
      // Use direct SQL insert with proper typing
      const { error } = await supabase.rpc('exec_sql', {
        sql: `INSERT INTO voice_signals (room_id, from_user, to_user, signal_type, signal_data) 
              VALUES ($1, $2, $3, $4, $5)`,
        params: [roomId, message.from, message.to, message.type, JSON.stringify(message)]
      }).single();

      if (error) {
        // Fallback to direct table access if RPC fails
        await (supabase as any)
          .from('voice_signals')
          .insert({
            room_id: roomId,
            from_user: message.from,
            to_user: message.to,
            signal_type: message.type,
            signal_data: message,
            created_at: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('发送信令消息失败:', error);
    }
  };

  // 处理收到的offer
  const handleOffer = async (offer: RTCSessionDescriptionInit, fromPeerId: string) => {
    let pc = peers.get(fromPeerId)?.connection;
    if (!pc) {
      pc = createPeerConnection(fromPeerId);
      setPeers(prev => new Map(prev).set(fromPeerId, { peerId: fromPeerId, connection: pc }));
    }

    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    sendSignalingMessage({
      type: 'answer',
      answer: answer,
      from: userId,
      to: fromPeerId
    });
  };

  // 处理收到的answer
  const handleAnswer = async (answer: RTCSessionDescriptionInit, fromPeerId: string) => {
    const peerData = peers.get(fromPeerId);
    if (peerData) {
      await peerData.connection.setRemoteDescription(answer);
    }
  };

  // 处理ICE候选
  const handleIceCandidate = async (candidate: RTCIceCandidateInit, fromPeerId: string) => {
    const peerData = peers.get(fromPeerId);
    if (peerData) {
      await peerData.connection.addIceCandidate(candidate);
    }
  };

  // 开始通话
  const startCall = async (targetPeerId: string) => {
    const pc = createPeerConnection(targetPeerId);
    setPeers(prev => new Map(prev).set(targetPeerId, { peerId: targetPeerId, connection: pc }));

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    sendSignalingMessage({
      type: 'offer',
      offer: offer,
      from: userId,
      to: targetPeerId
    });
  };

  // 连接语音聊天
  const connectVoiceChat = async () => {
    const stream = await initializeLocalStream();
    if (!stream) return;

    // 订阅房间的语音信令
    channelRef.current = supabase
      .channel(`voice_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'voice_signals',
          filter: `room_id=eq.${roomId}`
        },
        async (payload) => {
          const signal = payload.new;
          if (signal.to_user === userId && signal.from_user !== userId) {
            const data = signal.signal_data;
            
            switch (data.type) {
              case 'offer':
                await handleOffer(data.offer, signal.from_user);
                break;
              case 'answer':
                await handleAnswer(data.answer, signal.from_user);
                break;
              case 'ice-candidate':
                await handleIceCandidate(data.candidate, signal.from_user);
                break;
            }
          }
        }
      )
      .subscribe();

    // 通知其他用户我已加入语音聊天
    try {
      await (supabase as any)
        .from('voice_participants')
        .upsert({
          room_id: roomId,
          user_id: userId,
          player_name: playerName,
          is_connected: true,
          joined_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('更新语音参与者状态失败:', error);
    }

    setIsConnected(true);
    toast({
      title: '语音聊天已连接',
      description: '您现在可以与房间内其他玩家语音交流',
    });
  };

  // 断开语音聊天
  const disconnectVoiceChat = async () => {
    // 关闭所有peer连接
    peers.forEach(({ connection, audioElement }) => {
      connection.close();
      if (audioElement) {
        audioElement.pause();
        audioElement.srcObject = null;
      }
    });
    setPeers(new Map());

    // 停止本地流
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
      setLocalStream(null);
    }

    // 取消订阅
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    // 更新数据库状态
    try {
      await (supabase as any)
        .from('voice_participants')
        .update({ is_connected: false })
        .eq('room_id', roomId)
        .eq('user_id', userId);
    } catch (error) {
      console.error('更新语音参与者状态失败:', error);
    }

    setIsConnected(false);
    toast({
      title: '语音聊天已断开',
      description: '您已离开语音聊天',
    });
  };

  // 切换静音状态
  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  };

  // 监听其他用户加入语音聊天
  useEffect(() => {
    if (!isConnected) return;

    const participantsChannel = supabase
      .channel(`voice_participants_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'voice_participants',
          filter: `room_id=eq.${roomId}`
        },
        (payload) => {
          const participant = payload.new;
          if (participant.user_id !== userId && participant.is_connected) {
            // 向新加入的用户发起通话
            startCall(participant.user_id);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(participantsChannel);
    };
  }, [isConnected, userId, roomId]);

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (isConnected) {
        disconnectVoiceChat();
      }
    };
  }, []);

  return (
    <Card className="bg-werewolf-card border-werewolf-purple/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-werewolf-purple text-sm flex items-center">
          <Volume2 className="mr-2 h-4 w-4" />
          语音聊天
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <audio ref={localAudioRef} />
        
        <div className="flex flex-col gap-2">
          {!isConnected ? (
            <Button
              onClick={connectVoiceChat}
              className="bg-green-600 hover:bg-green-700 text-white text-sm py-2"
              size="sm"
            >
              <Volume2 className="mr-2 h-4 w-4" />
              加入语音聊天
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                onClick={toggleMute}
                variant={isMuted ? "destructive" : "secondary"}
                className="w-full text-sm py-2"
                size="sm"
              >
                {isMuted ? (
                  <>
                    <MicOff className="mr-2 h-4 w-4" />
                    取消静音
                  </>
                ) : (
                  <>
                    <Mic className="mr-2 h-4 w-4" />
                    静音
                  </>
                )}
              </Button>
              
              <Button
                onClick={disconnectVoiceChat}
                variant="outline"
                className="w-full text-sm py-2"
                size="sm"
              >
                <VolumeX className="mr-2 h-4 w-4" />
                离开语音聊天
              </Button>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-400">
          {isConnected ? (
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              已连接 · {peers.size} 人在语音中
            </div>
          ) : (
            '点击加入语音聊天与其他玩家交流'
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChat;
