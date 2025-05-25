
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
import { useLanguage } from '../layout/LanguageSwitcher';

const GameRulesDialog: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="nav-link">
          {t('game_rules')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] md:max-w-[800px] bg-werewolf-card text-werewolf-text">
        <DialogHeader>
          <DialogTitle className="text-werewolf-purple">{t('game_rules')}</DialogTitle>
          <DialogDescription>
            {t('learn_game_rules')}
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="win-conditions" className="w-full">
          <TabsList className="w-full bg-werewolf-dark/60 grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="win-conditions">{t('win_conditions')}</TabsTrigger>
            <TabsTrigger value="factions">{t('factions')}</TabsTrigger>
            <TabsTrigger value="phases">{t('game_phases')}</TabsTrigger>
            <TabsTrigger value="roles">{t('roles')}</TabsTrigger>
            <TabsTrigger value="status">{t('status')}</TabsTrigger>
            <TabsTrigger value="info">{t('info_visibility')}</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[400px] mt-4 pr-4">
            {/* Win Conditions Tab */}
            <TabsContent value="win-conditions" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('winning_conditions')}</h3>
                <ul className="list-disc pl-6">
                  <li>{t('win_condition_main')}</li>
                  <li>{t('win_condition_werewolf')}</li>
                  <li>{t('win_condition_draw')}</li>
                </ul>
              </div>
            </TabsContent>
            
            {/* Factions Tab */}
            <TabsContent value="factions" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('good_faction')}</h3>
                <p>{t('good_faction_desc')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">{t('role_villager')}</span></li>
                  <li><span className="font-semibold">{t('role_hunter')}</span></li>
                  <li><span className="font-semibold">{t('role_witch')}</span></li>
                  <li><span className="font-semibold">{t('role_seer')}</span></li>
                  <li><span className="font-semibold">{t('role_guard')}</span></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('werewolf_faction')}</h3>
                <p>{t('werewolf_faction_desc')}</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-semibold">{t('role_werewolf')}</span></li>
                  <li><span className="font-semibold">{t('role_white_wolf')}</span></li>
                  <li><span className="font-semibold">{t('role_warlock')}</span></li>
                  <li><span className="font-semibold">{t('role_demon')}</span></li>
                </ul>
              </div>
            </TabsContent>
            
            {/* Game Phases Tab */}
            <TabsContent value="phases" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('game_time')}</h3>
                <p>{t('game_time_desc')}</p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('action_phases')}</h3>
                <p>{t('action_phases_desc')}</p>
                
                <ol className="list-decimal pl-6 space-y-4">
                  <li>
                    <span className="font-medium text-werewolf-light">{t('phase_day')}</span>
                    <p className="mt-1">{t('phase_day_desc')}</p>
                  </li>
                  <li>
                    <span className="font-medium text-werewolf-light">{t('phase_evening')}</span>
                    <p className="mt-1">{t('phase_evening_desc')}</p>
                  </li>
                  <li>
                    <span className="font-medium text-werewolf-light">{t('phase_night')}</span>
                    <p className="mt-1">{t('phase_night_desc')}</p>
                  </li>
                  <li>
                    <span className="font-medium text-werewolf-light">{t('phase_dawn')}</span>
                    <p className="mt-1">{t('phase_dawn_desc')}</p>
                  </li>
                </ol>
                
                <p className="mt-4">{t('game_duration')}</p>
              </div>
            </TabsContent>
            
            {/* Roles Tab */}
            <TabsContent value="roles" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('roles_order')}</h3>
                <p className="text-sm italic">{t('roles_order_desc')}</p>
                <div className="p-3 bg-werewolf-dark/40 rounded-md">
                  <p className="font-medium">{t('roles_action_order')}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('roles_abilities')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-werewolf-light">{t('role_villager')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_villager')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('unlimited')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('none')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_villager')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-werewolf-light">{t('role_hunter')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_hunter')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('once')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('type_attack')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_hunter')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-werewolf-light">{t('role_witch')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_witch')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('twice')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('type_protection_attack')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_witch')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-werewolf-light">{t('role_seer')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_seer')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('unlimited')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('type_inspection')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_seer')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-werewolf-light">{t('role_guard')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_guard')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('unlimited')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('type_protection')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_guard')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-red-400">{t('role_werewolf')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_werewolf')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('unlimited')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('type_attack')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_werewolf')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-red-400">{t('role_white_wolf')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_white_wolf')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('once')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('type_attack')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_white_wolf')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-red-400">{t('role_warlock')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_warlock')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('once')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('type_protection')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_warlock')}</p>
                    </div>
                  </div>
                  
                  <div className="bg-werewolf-dark/40 p-3 rounded-md">
                    <h4 className="font-semibold text-red-400">{t('role_demon')}</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p><span className="font-medium">{t('ability')}:</span> {t('ability_demon')}</p>
                      <p><span className="font-medium">{t('usages')}:</span> {t('unlimited')}</p>
                      <p><span className="font-medium">{t('type')}:</span> {t('type_inspection')}</p>
                      <p><span className="font-medium">{t('effect')}:</span> {t('effect_demon')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-werewolf-dark/40 rounded-md text-sm">
                  <p className="mb-2">{t('werewolf_attack_rule')}</p>
                  <p>{t('double_protection_rule')}</p>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('player_setups')}</h3>
                <div className="space-y-3">
                  {[6, 7, 8, 9, 10, 11, 12].map((numPlayers) => (
                    <div key={numPlayers} className="bg-werewolf-dark/40 p-3 rounded-md">
                      <h4 className="font-semibold">{`${numPlayers} Player Setup`}</h4>
                      <p className="text-sm mt-1">{t(`setup_${numPlayers}`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Status Tab */}
            <TabsContent value="status" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('character_status')}</h3>
                <p>{t('status_desc')}</p>
                
                <div className="space-y-3 mt-4">
                  <div className="p-3 bg-green-900/20 border-l-4 border-green-600 rounded-md">
                    <h4 className="font-semibold">{t('status_normal')}</h4>
                    <p className="text-sm mt-1">{t('status_normal_desc')}</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-900/20 border-l-4 border-yellow-600 rounded-md">
                    <h4 className="font-semibold">{t('status_dying')}</h4>
                    <p className="text-sm mt-1">{t('status_dying_desc')}</p>
                  </div>
                  
                  <div className="p-3 bg-blue-900/20 border-l-4 border-blue-600 rounded-md">
                    <h4 className="font-semibold">{t('status_weak')}</h4>
                    <p className="text-sm mt-1">{t('status_weak_desc')}</p>
                  </div>
                  
                  <div className="p-3 bg-red-900/20 border-l-4 border-red-600 rounded-md">
                    <h4 className="font-semibold">{t('status_eliminated')}</h4>
                    <p className="text-sm mt-1">{t('status_eliminated_desc')}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Information Visibility Tab */}
            <TabsContent value="info" className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-werewolf-purple">{t('info_visibility')}</h3>
                <p>{t('info_visibility_desc')}</p>
                
                <div className="overflow-x-auto mt-4">
                  <table className="min-w-full bg-werewolf-dark/40 rounded-md">
                    <thead>
                      <tr className="border-b border-werewolf-purple/30">
                        <th className="py-2 px-4 text-left">{t('role')}</th>
                        <th className="py-2 px-4 text-left">{t('visible_phases')}</th>
                        <th className="py-2 px-4 text-left">{t('visible_info')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-werewolf-purple/20">
                      {['villager', 'hunter', 'witch', 'seer', 'guard', 'werewolf', 'white_wolf', 'warlock', 'demon'].map((role) => (
                        <tr key={role}>
                          <td className="py-2 px-4">
                            <span className={`font-medium ${['werewolf', 'white_wolf', 'warlock', 'demon'].includes(role) ? 'text-red-400' : 'text-werewolf-light'}`}>
                              {t(`role_${role}`)}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-sm">{t(`phases_${role}`)}</td>
                          <td className="py-2 px-4 text-sm">{t(`info_${role}`)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
