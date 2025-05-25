
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useLanguage } from '../layout/LanguageSwitcher';

const GameRulesDialog: React.FC = () => {
  const { t } = useLanguage();
  
  const characterSkills = [
    { role: 'Villager', skill: 'Sleep', usages: 'Unlimited', type: 'None', effect: 'None' },
    { role: 'Hunter', skill: 'Dying Shot', usages: '1', type: 'Attack', effect: 'Designate a player to attack before being eliminated' },
    { role: 'Witch', skill: 'Magic Potion', usages: '2', type: 'Protect or Attack', effect: 'Designate a player to protect or attack' },
    { role: 'Seer', skill: 'Prophecy', usages: 'Unlimited', type: 'View', effect: 'Specify to view one player\'s camp information' },
    { role: 'Guard', skill: 'Vigil', usages: 'Unlimited', type: 'Protection', effect: 'Designate a player (including yourself) to be protected from attacks' },
    { role: 'Werewolf', skill: 'Night Attack', usages: 'Unlimited', type: 'Attack', effect: 'Designated attack on one player' },
    { role: 'White Wolf', skill: 'Self-Destruct', usages: '1', type: 'Attack', effect: 'Designate an attack on a player, eliminating himself and target simultaneously' },
    { role: 'Warlock', skill: 'Voodoo', usages: '1', type: 'Protection', effect: 'Designate a player for protection' },
    { role: 'Demon', skill: 'Demon\'s Eye', usages: 'Unlimited', type: 'View', effect: 'Specify to view one player\'s character information' },
  ];

  const informationDisclosure = [
    { role: 'Villager', phases: 'Daytime + Evening + Dawn', scope: 'Public Chat + Quiz Questions and Options' },
    { role: 'Hunter', phases: 'All', scope: 'Public Chat + Own Attack Status + Quiz Questions and Options' },
    { role: 'Witch', phases: 'All', scope: 'Public Chat + Specific Night Attack Target + Quiz Questions and Options' },
    { role: 'Seer', phases: 'All', scope: 'Public Chat + Target Camp Information + Quiz Questions and Options' },
    { role: 'Guard', phases: 'Daytime + Evening + Dawn', scope: 'Public Chat + Quiz Questions and Options' },
    { role: 'Werewolf', phases: 'All', scope: 'Public Chat + Team Chat + Werewolf/White Wolf Players + Quiz Questions and Options' },
    { role: 'White Wolf', phases: 'All', scope: 'Public Chat + Team Chat + Werewolf/White Wolf Players + Quiz Questions and Options' },
    { role: 'Warlock', phases: 'All', scope: 'Public Chat + Witch Poison Target + Quiz Questions and Options' },
    { role: 'Demon', phases: 'All', scope: 'Public Chat + Werewolf/White Wolf Players + Target Role Info + Quiz Questions and Options' },
  ];

  const playerConfigurations = [
    { players: 6, config: '2 Werewolves, 2 Villagers, 1 Seer, 1 Witch' },
    { players: 7, config: '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch' },
    { players: 8, config: '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock' },
    { players: 9, config: '1 Werewolf, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock' },
    { players: 10, config: '1 Werewolf, 1 White Wolf, 2 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard' },
    { players: 11, config: '1 Werewolf, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard' },
    { players: 12, config: '2 Werewolves, 1 White Wolf, 3 Villagers, 1 Hunter, 1 Seer, 1 Witch, 1 Warlock, 1 Demon, 1 Guard' },
  ];
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="nav-link">
          {t('game_rules')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] md:max-w-[1000px] bg-werewolf-card text-werewolf-text">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple">Game Rules</DialogTitle>
          <DialogDescription>
            Learn the complete game rules and mechanics
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="win-conditions" className="w-full">
          <TabsList className="w-full bg-werewolf-dark/60 grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="win-conditions">Win Conditions</TabsTrigger>
            <TabsTrigger value="factions">Factions</TabsTrigger>
            <TabsTrigger value="phases">Game Phases</TabsTrigger>
            <TabsTrigger value="roles">Character Skills</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
            <TabsTrigger value="info">Information</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[500px] mt-4 pr-4">
            {/* Win Conditions Tab */}
            <TabsContent value="win-conditions" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-werewolf-purple">Winning Conditions</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-werewolf-dark/40 rounded-md">
                    <h4 className="font-semibold text-werewolf-light mb-2">Primary Win Condition</h4>
                    <p>Any character from the same camp survives to the end and eliminates all characters from the opposing camp.</p>
                  </div>
                  <div className="p-3 bg-werewolf-dark/40 rounded-md">
                    <h4 className="font-semibold text-werewolf-light mb-2">Werewolf Auto-Win</h4>
                    <p>When the sum of surviving Werewolf and White Wolf characters equals the number of surviving Good Guys camp characters, the Werewolf camp automatically wins.</p>
                  </div>
                  <div className="p-3 bg-werewolf-dark/40 rounded-md">
                    <h4 className="font-semibold text-werewolf-light mb-2">Draw Condition</h4>
                    <p>If there is no winner at the end of the predetermined action phase, both sides are considered to have won.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Factions Tab */}
            <TabsContent value="factions" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-werewolf-purple">Camp Description</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-900/20 border-l-4 border-green-600 rounded-md">
                    <h4 className="font-semibold text-green-400 mb-2">Good Guys Camp</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Villagers</li>
                      <li>• Hunter</li>
                      <li>• Witch</li>
                      <li>• Seer (Prophet)</li>
                      <li>• Guard</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-900/20 border-l-4 border-red-600 rounded-md">
                    <h4 className="font-semibold text-red-400 mb-2">Werewolf Camp</h4>
                    <ul className="space-y-1 text-sm">
                      <li>• Werewolf</li>
                      <li>• White Wolf</li>
                      <li>• Warlock</li>
                      <li>• Demon</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Game Phases Tab */}
            <TabsContent value="phases" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-werewolf-purple">Game Time and Action Phases</h3>
                
                <div className="p-3 bg-werewolf-dark/40 rounded-md">
                  <h4 className="font-semibold text-werewolf-light mb-2">Game Duration</h4>
                  <p>The game begins with Day 1 Evening Quiz and proceeds up to Day 9 Daytime phase - maximum of 24 phases.</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-werewolf-light">Daily Action Phases</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-900/20 border border-blue-600/30 rounded-md">
                      <h5 className="font-medium text-blue-400">Phase 1: Daytime</h5>
                      <p className="text-sm mt-1">Time limit: 5 minutes or all vote completion</p>
                      <p className="text-sm">Open discussion and voting to eliminate suspected werewolf camp players</p>
                    </div>
                    
                    <div className="p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-md">
                      <h5 className="font-medium text-yellow-400">Phase 2: Evening Quiz</h5>
                      <p className="text-sm mt-1">Time limit: 1 minute</p>
                      <p className="text-sm">All players answer quiz questions to enable night actions</p>
                    </div>
                    
                    <div className="p-3 bg-purple-900/20 border border-purple-600/30 rounded-md">
                      <h5 className="font-medium text-purple-400">Phase 3: Nighttime</h5>
                      <p className="text-sm mt-1">Time limit: 3 minutes or all skill decisions</p>
                      <p className="text-sm">Characters perform night actions in priority order</p>
                    </div>
                    
                    <div className="p-3 bg-orange-900/20 border border-orange-600/30 rounded-md">
                      <h5 className="font-medium text-orange-400">Phase 4: Dawn Quiz</h5>
                      <p className="text-sm mt-1">Time limit: 1 minute</p>
                      <p className="text-sm">Quiz to exit Near-Death state and enter Weakened state</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-werewolf-dark/40 rounded-md">
                  <h4 className="font-semibold text-werewolf-light mb-2">Night Action Priority Order</h4>
                  <p className="text-sm">Villager → Guard → Werewolf → Seer → Demon → Witch → Warlock → White Wolf → Hunter</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Character Skills Tab */}
            <TabsContent value="roles" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-werewolf-purple">Character Skills</h3>
                
                <div className="border border-werewolf-purple/30 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-werewolf-dark/60">
                        <TableHead className="text-werewolf-purple font-semibold">Role</TableHead>
                        <TableHead className="text-werewolf-purple font-semibold">Skill</TableHead>
                        <TableHead className="text-werewolf-purple font-semibold">Usages</TableHead>
                        <TableHead className="text-werewolf-purple font-semibold">Type</TableHead>
                        <TableHead className="text-werewolf-purple font-semibold">Effect</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {characterSkills.map((character, index) => (
                        <TableRow key={index} className="hover:bg-werewolf-dark/20">
                          <TableCell className={`font-medium ${['Werewolf', 'White Wolf', 'Warlock', 'Demon'].includes(character.role) ? 'text-red-400' : 'text-green-400'}`}>
                            {character.role}
                          </TableCell>
                          <TableCell>{character.skill}</TableCell>
                          <TableCell>{character.usages}</TableCell>
                          <TableCell>{character.type}</TableCell>
                          <TableCell className="text-sm">{character.effect}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-werewolf-light">Special Rules</h4>
                  <div className="p-3 bg-werewolf-dark/40 rounded-md text-sm space-y-2">
                    <p>• When multiple Werewolf characters use skills simultaneously, it counts as a single attack</p>
                    <p>• A character enters Weakened state when targeted by two different Protection skills</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-werewolf-light">Player Configurations</h4>
                  <div className="border border-werewolf-purple/30 rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-werewolf-dark/60">
                          <TableHead className="text-werewolf-purple font-semibold">Players</TableHead>
                          <TableHead className="text-werewolf-purple font-semibold">Role Configuration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {playerConfigurations.map((config, index) => (
                          <TableRow key={index} className="hover:bg-werewolf-dark/20">
                            <TableCell className="font-medium text-werewolf-light">{config.players}</TableCell>
                            <TableCell className="text-sm">{config.config}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Status Tab */}
            <TabsContent value="status" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-werewolf-purple">Character Status</h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-green-900/20 border-l-4 border-green-600 rounded-md">
                    <h4 className="font-semibold text-green-400 mb-2">Normal State</h4>
                    <p className="text-sm">Can participate in discussions, vote, use skills, be targeted for skills, be targeted for votes, and participate in quizzes. All characters start in Normal state.</p>
                  </div>
                  
                  <div className="p-4 bg-yellow-900/20 border-l-4 border-yellow-600 rounded-md">
                    <h4 className="font-semibold text-yellow-400 mb-2">Near-Death State</h4>
                    <p className="text-sm">Can use skills, be targeted for skills, and participate in quizzes. Cannot participate in discussions, vote, or be targeted for votes. Entered when attacked while in Normal state. Returns to Normal when protected.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-900/20 border-l-4 border-blue-600 rounded-md">
                    <h4 className="font-semibold text-blue-400 mb-2">Weakened State</h4>
                    <p className="text-sm">Can participate in discussions, be targeted for skills, be targeted for votes, and answer quizzes. Cannot vote or use skills. Entered from Near-Death by correctly answering Dawn Quiz, or when targeted by two Protection skills. Cannot return to Normal. Eliminated when attacked.</p>
                  </div>
                  
                  <div className="p-4 bg-red-900/20 border-l-4 border-red-600 rounded-md">
                    <h4 className="font-semibold text-red-400 mb-2">Elimination State</h4>
                    <p className="text-sm">Can only participate in answering quizzes. Cannot participate in discussions, vote, use skills, or be targeted. Entered when voted out, when failing Dawn Quiz while Near-Death, or when attacked while Weakened.</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Information Disclosure Tab */}
            <TabsContent value="info" className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-werewolf-purple">Information Disclosure</h3>
                <p className="text-sm text-gray-400">Different roles can see different information at different stages</p>
                
                <div className="border border-werewolf-purple/30 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-werewolf-dark/60">
                        <TableHead className="text-werewolf-purple font-semibold">Role</TableHead>
                        <TableHead className="text-werewolf-purple font-semibold">Disclosure Phases</TableHead>
                        <TableHead className="text-werewolf-purple font-semibold">Information Scope</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {informationDisclosure.map((info, index) => (
                        <TableRow key={index} className="hover:bg-werewolf-dark/20">
                          <TableCell className={`font-medium ${['Werewolf', 'White Wolf', 'Warlock', 'Demon'].includes(info.role) ? 'text-red-400' : 'text-green-400'}`}>
                            {info.role}
                          </TableCell>
                          <TableCell className="text-sm">{info.phases}</TableCell>
                          <TableCell className="text-sm">{info.scope}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default GameRulesDialog;
