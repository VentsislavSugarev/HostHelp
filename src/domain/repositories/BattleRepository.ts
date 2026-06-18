import { Battle, BattleResultType } from '../models/Battle';

export interface BattleRepository {
  getBattleById(id: string): Promise<Battle | null>;
  getBattlesByEventId(eventId: string): Promise<Battle[]>;
  createBattle(battle: Partial<Battle>): Promise<Battle>;
  updateBattleResult(id: string, resultType: BattleResultType, winningTeam: string | null): Promise<void>;
  deleteBattle(id: string): Promise<void>;
}