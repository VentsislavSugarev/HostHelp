import { Round } from '../../../domain/models/Round';
import { RoundRepository } from '../../../domain/repositories/RoundRepository';

export class SupabaseRoundRepository implements RoundRepository {
  async getRoundsByBattleId(battleId: string): Promise<Round[]> {
    return [];
  }

  async createRound(round: Partial<Round>): Promise<Round> {
    return {
      id: Math.random().toString(36).substring(2),
      battleId: round.battleId || '',
      stageNumber: round.stageNumber || 1,
      format: round.format || 'EASY_MODE',
      timeLimitInSeconds: round.timeLimitInSeconds || 60,
      isFinished: round.isFinished ?? false
    };
  }

  async updateRoundStatus(id: string, isFinished: boolean): Promise<void> {
    return Promise.resolve();
  }
}