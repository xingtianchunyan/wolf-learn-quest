import { describe, it, expect } from 'vitest';
import {
  toPhaseName,
  toPhaseId,
  isValidPhaseNumber,
  isValidPhaseName,
  getPhaseDisplayName,
  getNextPhase,
  getPreviousPhase,
  isVotingPhase,
  isNightActionPhase,
  PHASE_MAPPING,
  REVERSE_PHASE_MAPPING,
  type PhaseNumber,
  type PhaseName
} from '../phaseUtils';

describe('phaseUtils', () => {
  describe('toPhaseName', () => {
    it('should convert phase numbers to phase names correctly', () => {
      expect(toPhaseName(1)).toBe('day');
      expect(toPhaseName(2)).toBe('evening');
      expect(toPhaseName(3)).toBe('night');
      expect(toPhaseName(4)).toBe('dawn');
    });
  });

  describe('toPhaseId', () => {
    it('should convert phase names to phase numbers correctly', () => {
      expect(toPhaseId('day')).toBe(1);
      expect(toPhaseId('evening')).toBe(2);
      expect(toPhaseId('night')).toBe(3);
      expect(toPhaseId('dawn')).toBe(4);
    });
  });

  describe('isValidPhaseNumber', () => {
    it('should validate correct phase numbers', () => {
      expect(isValidPhaseNumber(1)).toBe(true);
      expect(isValidPhaseNumber(2)).toBe(true);
      expect(isValidPhaseNumber(3)).toBe(true);
      expect(isValidPhaseNumber(4)).toBe(true);
    });

    it('should reject invalid phase numbers', () => {
      expect(isValidPhaseNumber(0)).toBe(false);
      expect(isValidPhaseNumber(5)).toBe(false);
      expect(isValidPhaseNumber(-1)).toBe(false);
      expect(isValidPhaseNumber(1.5)).toBe(false);
    });
  });

  describe('isValidPhaseName', () => {
    it('should validate correct phase names', () => {
      expect(isValidPhaseName('day')).toBe(true);
      expect(isValidPhaseName('evening')).toBe(true);
      expect(isValidPhaseName('night')).toBe(true);
      expect(isValidPhaseName('dawn')).toBe(true);
    });

    it('should reject invalid phase names', () => {
      expect(isValidPhaseName('invalid')).toBe(false);
      expect(isValidPhaseName('')).toBe(false);
      expect(isValidPhaseName('Day')).toBe(false);
      expect(isValidPhaseName('NIGHT')).toBe(false);
    });
  });

  describe('getPhaseDisplayName', () => {
    it('should return Chinese display names for phase numbers', () => {
      expect(getPhaseDisplayName(1)).toBe('白天');
      expect(getPhaseDisplayName(2)).toBe('黄昏');
      expect(getPhaseDisplayName(3)).toBe('夜晚');
      expect(getPhaseDisplayName(4)).toBe('黎明');
    });

    it('should return Chinese display names for phase names', () => {
      expect(getPhaseDisplayName('day')).toBe('白天');
      expect(getPhaseDisplayName('evening')).toBe('黄昏');
      expect(getPhaseDisplayName('night')).toBe('夜晚');
      expect(getPhaseDisplayName('dawn')).toBe('黎明');
    });
  });

  describe('getNextPhase', () => {
    it('should return the next phase correctly', () => {
      expect(getNextPhase(1)).toBe(2);
      expect(getNextPhase(2)).toBe(3);
      expect(getNextPhase(3)).toBe(4);
    });

    it('should wrap around from dawn to day', () => {
      expect(getNextPhase(4)).toBe(1);
    });
  });

  describe('getPreviousPhase', () => {
    it('should return the previous phase correctly', () => {
      expect(getPreviousPhase(2)).toBe(1);
      expect(getPreviousPhase(3)).toBe(2);
      expect(getPreviousPhase(4)).toBe(3);
    });

    it('should wrap around from day to dawn', () => {
      expect(getPreviousPhase(1)).toBe(4);
    });
  });

  describe('isVotingPhase', () => {
    it('should identify voting phases correctly with numbers', () => {
      expect(isVotingPhase(1)).toBe(true); // day
      expect(isVotingPhase(2)).toBe(true); // evening
      expect(isVotingPhase(3)).toBe(false); // night
      expect(isVotingPhase(4)).toBe(false); // dawn
    });

    it('should identify voting phases correctly with names', () => {
      expect(isVotingPhase('day')).toBe(true);
      expect(isVotingPhase('evening')).toBe(true);
      expect(isVotingPhase('night')).toBe(false);
      expect(isVotingPhase('dawn')).toBe(false);
    });
  });

  describe('isNightActionPhase', () => {
    it('should identify night action phase correctly with numbers', () => {
      expect(isNightActionPhase(1)).toBe(false); // day
      expect(isNightActionPhase(2)).toBe(false); // evening
      expect(isNightActionPhase(3)).toBe(true); // night
      expect(isNightActionPhase(4)).toBe(false); // dawn
    });

    it('should identify night action phase correctly with names', () => {
      expect(isNightActionPhase('day')).toBe(false);
      expect(isNightActionPhase('evening')).toBe(false);
      expect(isNightActionPhase('night')).toBe(true);
      expect(isNightActionPhase('dawn')).toBe(false);
    });
  });

  describe('constants', () => {
    it('should have correct PHASE_MAPPING', () => {
      expect(PHASE_MAPPING[1]).toBe('day');
      expect(PHASE_MAPPING[2]).toBe('evening');
      expect(PHASE_MAPPING[3]).toBe('night');
      expect(PHASE_MAPPING[4]).toBe('dawn');
    });

    it('should have correct REVERSE_PHASE_MAPPING', () => {
      expect(REVERSE_PHASE_MAPPING.day).toBe(1);
      expect(REVERSE_PHASE_MAPPING.evening).toBe(2);
      expect(REVERSE_PHASE_MAPPING.night).toBe(3);
      expect(REVERSE_PHASE_MAPPING.dawn).toBe(4);
    });
  });
});