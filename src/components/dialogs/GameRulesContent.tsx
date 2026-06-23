import React from 'react';
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

const GameRulesContent: React.FC = () => {
  const { t } = useLanguage();

  const characterSkills = [
    {
      role: t('villager'),
      skill: t('skill_sleep'),
      usages: t('usage_unlimited'),
      type: t('type_none'),
      effect: t('effect_none'),
    },
    {
      role: t('hunter'),
      skill: t('skill_dying_shot'),
      usages: t('usage_1'),
      type: t('type_attack'),
      effect: t('effect_dying_shot'),
    },
    {
      role: t('witch'),
      skill: t('skill_magic_potion'),
      usages: t('usage_2'),
      type: t('type_protect_or_attack'),
      effect: t('effect_magic_potion'),
    },
    {
      role: t('seer'),
      skill: t('skill_prophecy'),
      usages: t('usage_unlimited'),
      type: t('type_view'),
      effect: t('effect_prophecy'),
    },
    {
      role: t('guard'),
      skill: t('skill_vigil'),
      usages: t('usage_unlimited'),
      type: t('type_protect'),
      effect: t('effect_vigil'),
    },
    {
      role: t('werewolf'),
      skill: t('skill_night_attack'),
      usages: t('usage_unlimited'),
      type: t('type_attack'),
      effect: t('effect_night_attack'),
    },
    {
      role: t('white_wolf'),
      skill: t('skill_self_destruct'),
      usages: t('usage_1'),
      type: t('type_attack'),
      effect: t('effect_self_destruct'),
    },
    {
      role: t('warlock'),
      skill: t('skill_voodoo'),
      usages: t('usage_1'),
      type: t('type_protect'),
      effect: t('effect_voodoo'),
    },
    {
      role: t('demon'),
      skill: t('skill_demon_eye'),
      usages: t('usage_unlimited'),
      type: t('type_view'),
      effect: t('effect_demon_eye'),
    },
  ];

  const informationDisclosure = [
    {
      role: t('villager'),
      phases: t('info_phases_villager'),
      scope: t('info_scope_villager'),
    },
    {
      role: t('hunter'),
      phases: t('info_phases_all'),
      scope: t('info_scope_hunter'),
    },
    {
      role: t('witch'),
      phases: t('info_phases_all'),
      scope: t('info_scope_witch'),
    },
    {
      role: t('seer'),
      phases: t('info_phases_all'),
      scope: t('info_scope_seer'),
    },
    {
      role: t('guard'),
      phases: t('info_phases_villager'),
      scope: t('info_scope_villager'),
    },
    {
      role: t('werewolf'),
      phases: t('info_phases_all'),
      scope: t('info_scope_werewolf'),
    },
    {
      role: t('white_wolf'),
      phases: t('info_phases_all'),
      scope: t('info_scope_werewolf'),
    },
    {
      role: t('warlock'),
      phases: t('info_phases_all'),
      scope: t('info_scope_warlock'),
    },
    {
      role: t('demon'),
      phases: t('info_phases_all'),
      scope: t('info_scope_demon'),
    },
  ];

  const playerConfigurations = [
    { players: 6, config: t('player_config_6') },
    { players: 7, config: t('player_config_7') },
    { players: 8, config: t('player_config_8') },
    { players: 9, config: t('player_config_9') },
    { players: 10, config: t('player_config_10') },
    { players: 11, config: t('player_config_11') },
    { players: 12, config: t('player_config_12') },
  ];

  return (
    <Tabs defaultValue='win-conditions' className='w-full'>
      <TabsList className='w-full bg-werewolf-dark/60 grid grid-cols-3 md:grid-cols-6'>
        <TabsTrigger value='win-conditions'>
          {t('tab_win_conditions')}
        </TabsTrigger>
        <TabsTrigger value='factions'>{t('tab_factions')}</TabsTrigger>
        <TabsTrigger value='phases'>{t('tab_phases')}</TabsTrigger>
        <TabsTrigger value='roles'>{t('tab_roles')}</TabsTrigger>
        <TabsTrigger value='status'>{t('tab_status')}</TabsTrigger>
        <TabsTrigger value='info'>{t('tab_info')}</TabsTrigger>
      </TabsList>
      <ScrollArea className='h-[500px] mt-4 pr-4'>
        {/* Win Conditions Tab */}
        <TabsContent value='win-conditions' className='space-y-4'>
          <div className='space-y-4'>
            <h3 className='font-bold text-lg text-werewolf-purple'>
              {t('win_conditions_title')}
            </h3>
            <div className='space-y-3'>
              <div className='p-3 bg-werewolf-dark/40 rounded-md'>
                <h4 className='font-semibold text-werewolf-light mb-2'>
                  {t('primary_win_condition')}
                </h4>
                <p>{t('primary_win_condition_desc')}</p>
              </div>
              <div className='p-3 bg-werewolf-dark/40 rounded-md'>
                <h4 className='font-semibold text-werewolf-light mb-2'>
                  {t('werewolf_auto_win')}
                </h4>
                <p>{t('werewolf_auto_win_desc')}</p>
              </div>
              <div className='p-3 bg-werewolf-dark/40 rounded-md'>
                <h4 className='font-semibold text-werewolf-light mb-2'>
                  {t('draw_condition')}
                </h4>
                <p>{t('draw_condition_desc')}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Factions Tab */}
        <TabsContent value='factions' className='space-y-4'>
          <div className='space-y-4'>
            <h3 className='font-bold text-lg text-werewolf-purple'>
              {t('factions_title')}
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-4 bg-green-900/20 border-l-4 border-green-600 rounded-md'>
                <h4 className='font-semibold text-green-400 mb-2'>
                  {t('good_guys_camp')}
                </h4>
                <ul className='space-y-1 text-sm'>
                  <li>• {t('villagers')}</li>
                  <li>• {t('hunter')}</li>
                  <li>• {t('witch')}</li>
                  <li>• {t('seer')}</li>
                  <li>• {t('guard')}</li>
                </ul>
              </div>
              <div className='p-4 bg-red-900/20 border-l-4 border-red-600 rounded-md'>
                <h4 className='font-semibold text-red-400 mb-2'>
                  {t('werewolf_camp')}
                </h4>
                <ul className='space-y-1 text-sm'>
                  <li>• {t('werewolf')}</li>
                  <li>• {t('white_wolf')}</li>
                  <li>• {t('warlock')}</li>
                  <li>• {t('demon')}</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Game Phases Tab */}
        <TabsContent value='phases' className='space-y-4'>
          <div className='space-y-4'>
            <h3 className='font-bold text-lg text-werewolf-purple'>
              {t('game_phases_title')}
            </h3>

            <div className='p-3 bg-werewolf-dark/40 rounded-md'>
              <h4 className='font-semibold text-werewolf-light mb-2'>
                {t('game_duration')}
              </h4>
              <p>{t('game_duration_desc')}</p>
            </div>

            <div className='space-y-3'>
              <h4 className='font-semibold text-werewolf-light'>
                {t('daily_action_phases')}
              </h4>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-3 bg-blue-900/20 border border-blue-600/30 rounded-md'>
                  <h5 className='font-medium text-blue-400'>
                    {t('phase_daytime')}
                  </h5>
                  <p className='text-sm mt-1'>{t('phase_daytime_time')}</p>
                  <p className='text-sm'>{t('phase_daytime_desc')}</p>
                </div>

                <div className='p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-md'>
                  <h5 className='font-medium text-yellow-400'>
                    {t('phase_evening_quiz')}
                  </h5>
                  <p className='text-sm mt-1'>{t('phase_evening_quiz_time')}</p>
                  <p className='text-sm'>{t('phase_evening_quiz_desc')}</p>
                </div>

                <div className='p-3 bg-purple-900/20 border border-purple-600/30 rounded-md'>
                  <h5 className='font-medium text-purple-400'>
                    {t('phase_nighttime')}
                  </h5>
                  <p className='text-sm mt-1'>{t('phase_nighttime_time')}</p>
                  <p className='text-sm'>{t('phase_nighttime_desc')}</p>
                </div>

                <div className='p-3 bg-orange-900/20 border border-orange-600/30 rounded-md'>
                  <h5 className='font-medium text-orange-400'>
                    {t('phase_dawn_quiz')}
                  </h5>
                  <p className='text-sm mt-1'>{t('phase_dawn_quiz_time')}</p>
                  <p className='text-sm'>{t('phase_dawn_quiz_desc')}</p>
                </div>
              </div>
            </div>

            <div className='p-3 bg-werewolf-dark/40 rounded-md'>
              <h4 className='font-semibold text-werewolf-light mb-2'>
                {t('night_action_priority')}
              </h4>
              <p className='text-sm'>{t('night_action_priority_desc')}</p>
            </div>
          </div>
        </TabsContent>

        {/* Character Skills Tab */}
        <TabsContent value='roles' className='space-y-4'>
          <div className='space-y-4'>
            <h3 className='font-bold text-lg text-werewolf-purple'>
              {t('character_skills_title')}
            </h3>

            <div className='border border-werewolf-purple/30 rounded-md overflow-hidden'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-werewolf-dark/60'>
                    <TableHead className='text-werewolf-purple font-semibold'>
                      {t('role')}
                    </TableHead>
                    <TableHead className='text-werewolf-purple font-semibold'>
                      {t('skill')}
                    </TableHead>
                    <TableHead className='text-werewolf-purple font-semibold'>
                      {t('usages')}
                    </TableHead>
                    <TableHead className='text-werewolf-purple font-semibold'>
                      {t('type')}
                    </TableHead>
                    <TableHead className='text-werewolf-purple font-semibold'>
                      {t('effect')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {characterSkills.map((character, index) => (
                    <TableRow key={index} className='hover:bg-werewolf-dark/20'>
                      <TableCell
                        className={`font-medium ${['Werewolf', 'White Wolf', 'Warlock', 'Demon'].includes(character.role) ? 'text-red-400' : 'text-green-400'}`}
                      >
                        {character.role}
                      </TableCell>
                      <TableCell>{character.skill}</TableCell>
                      <TableCell>{character.usages}</TableCell>
                      <TableCell>{character.type}</TableCell>
                      <TableCell className='text-sm'>
                        {character.effect}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className='space-y-2'>
              <h4 className='font-semibold text-werewolf-light'>
                {t('special_rules')}
              </h4>
              <div className='p-3 bg-werewolf-dark/40 rounded-md text-sm space-y-2'>
                <p>• {t('special_rules_1')}</p>
                <p>• {t('special_rules_2')}</p>
              </div>
            </div>

            <div className='space-y-2'>
              <h4 className='font-semibold text-werewolf-light'>
                {t('player_configurations')}
              </h4>
              <div className='border border-werewolf-purple/30 rounded-md overflow-hidden'>
                <Table>
                  <TableHeader>
                    <TableRow className='bg-werewolf-dark/60'>
                      <TableHead className='text-werewolf-purple font-semibold'>
                        {t('players')}
                      </TableHead>
                      <TableHead className='text-werewolf-purple font-semibold'>
                        {t('role_configuration')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {playerConfigurations.map((config, index) => (
                      <TableRow
                        key={index}
                        className='hover:bg-werewolf-dark/20'
                      >
                        <TableCell className='font-medium text-werewolf-light'>
                          {config.players}
                        </TableCell>
                        <TableCell className='text-sm'>
                          {config.config}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Status Tab */}
        <TabsContent value='status' className='space-y-4'>
          <div className='space-y-4'>
            <h3 className='font-bold text-lg text-werewolf-purple'>
              {t('character_status_title')}
            </h3>

            <div className='space-y-3'>
              <div className='p-4 bg-green-900/20 border-l-4 border-green-600 rounded-md'>
                <h4 className='font-semibold text-green-400 mb-2'>
                  {t('normal_state')}
                </h4>
                <p className='text-sm'>{t('normal_state_desc')}</p>
              </div>

              <div className='p-4 bg-yellow-900/20 border-l-4 border-yellow-600 rounded-md'>
                <h4 className='font-semibold text-yellow-400 mb-2'>
                  {t('near_death_state')}
                </h4>
                <p className='text-sm'>{t('near_death_state_desc')}</p>
              </div>

              <div className='p-4 bg-blue-900/20 border-l-4 border-blue-600 rounded-md'>
                <h4 className='font-semibold text-blue-400 mb-2'>
                  {t('weakened_state')}
                </h4>
                <p className='text-sm'>{t('weakened_state_desc')}</p>
              </div>

              <div className='p-4 bg-red-900/20 border-l-4 border-red-600 rounded-md'>
                <h4 className='font-semibold text-red-400 mb-2'>
                  {t('elimination_state')}
                </h4>
                <p className='text-sm'>{t('elimination_state_desc')}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Information Disclosure Tab */}
        <TabsContent value='info' className='space-y-4'>
          <div className='space-y-4'>
            <h3 className='font-bold text-lg text-werewolf-purple'>
              {t('info_disclosure_title')}
            </h3>
            <p className='text-sm text-gray-400'>{t('info_disclosure_desc')}</p>

            <div className='border border-werewolf-purple/30 rounded-md overflow-hidden'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-werewolf-dark/60'>
                    <TableHead className='text-werewolf-purple font-semibold'>
                      {t('role')}
                    </TableHead>
                    <TableHead className='text-werewolf-purple font-semibold'>
                      {t('disclosure_phases')}
                    </TableHead>
                    <TableHead className='text-werewolf-purple font-semibold'>
                      {t('information_scope')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {informationDisclosure.map((info, index) => (
                    <TableRow key={index} className='hover:bg-werewolf-dark/20'>
                      <TableCell
                        className={`font-medium ${['Werewolf', 'White Wolf', 'Warlock', 'Demon'].includes(info.role) ? 'text-red-400' : 'text-green-400'}`}
                      >
                        {info.role}
                      </TableCell>
                      <TableCell className='text-sm'>{info.phases}</TableCell>
                      <TableCell className='text-sm'>{info.scope}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </ScrollArea>
    </Tabs>
  );
};

export default GameRulesContent;
