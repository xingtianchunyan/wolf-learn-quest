
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

const GameRulesDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="nav-link">
          Game Rules
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-werewolf-card text-werewolf-text">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple">Game Rules</DialogTitle>
          <DialogDescription>
            Learn how to play Werewolf Social Learning
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="w-full bg-werewolf-dark/60">
            <TabsTrigger value="basic" className="flex-1">Basic Rules</TabsTrigger>
            <TabsTrigger value="roles" className="flex-1">Character Roles</TabsTrigger>
            <TabsTrigger value="quiz" className="flex-1">Quiz System</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] mt-4 pr-4">
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Game Overview</h3>
                <p>Werewolf Social Learning combines the classic social deduction game "Werewolf" with an interactive quiz system.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Game Flow</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The game alternates between day and night phases</li>
                  <li>During the night, werewolves secretly choose a victim</li>
                  <li>During the day, all players discuss and vote to eliminate a suspected werewolf</li>
                  <li>Players must answer quiz questions to unlock special abilities</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Winning Conditions</h3>
                <ul className="list-disc pl-6">
                  <li><span className="text-werewolf-light">Villagers win</span> when all werewolves are eliminated</li>
                  <li><span className="text-red-400">Werewolves win</span> when the number of werewolves equals or exceeds the number of villagers</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="roles" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Villager Team</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">Villager:</span> Basic role with voting ability</li>
                  <li><span className="font-semibold">Seer:</span> Can check one player's identity each night</li>
                  <li><span className="font-semibold">Doctor:</span> Can protect one player from elimination each night</li>
                  <li><span className="font-semibold">Hunter:</span> When eliminated, can take another player with them</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Werewolf Team</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">Werewolf:</span> Eliminates one player each night and votes during the day</li>
                  <li><span className="font-semibold">Alpha Werewolf:</span> Has the final decision on night eliminations</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Neutral Roles</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">Jester:</span> Wins if they get voted out during the day</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="quiz" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Quiz System</h3>
                <p>The quiz system is integrated into the game to promote learning while playing:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Players must answer questions to activate special abilities</li>
                  <li>Correct answers provide advantages in the game</li>
                  <li>Questions are customized by the game host/teacher</li>
                  <li>AI can generate contextual questions based on the learning material</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Question Types</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Multiple choice questions</li>
                  <li>True/False questions</li>
                  <li>Short answer questions</li>
                  <li>Discussion prompts</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Learning Benefits</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encourages active participation in learning</li>
                  <li>Creates a fun, competitive environment for knowledge retention</li>
                  <li>Helps new community members integrate by learning alongside gameplay</li>
                </ul>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GameRulesDialog;
