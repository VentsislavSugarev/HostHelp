import { Round } from '../models/Round';

export interface RoundRepository {
  getRoundsByBattleId(battleId: string): Promise<Round[]>;
  createRound(round: Partial<Round>): Promise<Round>;
  updateRoundStatus(id: string, isFinished: boolean): Promise<void>;
}