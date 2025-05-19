
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
        <Tabs defaultValue="win-conditions" className="w-full">
          <TabsList className="w-full bg-werewolf-dark/60 grid grid-cols-3">
            <TabsTrigger value="win-conditions">Win Conditions</TabsTrigger>
            <TabsTrigger value="factions">Factions</TabsTrigger>
            <TabsTrigger value="phases">Game Phases</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] mt-4 pr-4">
            <TabsContent value="win-conditions" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Winning Conditions</h3>
                <ul className="list-disc pl-6">
                  <li><span className="text-werewolf-light">Villagers win</span> when all werewolves are eliminated</li>
                  <li><span className="text-red-400">Werewolves win</span> when the number of werewolves equals or exceeds the number of villagers</li>
                  <li><span className="text-yellow-400">Jester wins</span> individually if they get voted out during the day</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="factions" className="space-y-4">
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
            
            <TabsContent value="phases" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Night Phase</h3>
                <p>During the night phase, the following actions occur in order:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Werewolves awaken and choose a victim</li>
                  <li>Seer awakens and checks one player's identity</li>
                  <li>Doctor awakens and chooses a player to protect</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Day Phase</h3>
                <p>During the day phase, the following occurs:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Results from the night are revealed (who was eliminated)</li>
                  <li>All players discuss and try to identify werewolves</li>
                  <li>Players answer quiz questions to gain special abilities</li>
                  <li>All players vote to eliminate one suspected werewolf</li>
                </ol>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">Character Status</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">Alive:</span> Can participate in all game actions</li>
                  <li><span className="font-semibold">Dead:</span> Cannot vote or use abilities, but can still participate in quiz questions</li>
                  <li><span className="font-semibold">Silenced:</span> Temporarily unable to speak during discussions</li>
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
