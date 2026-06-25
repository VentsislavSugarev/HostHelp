import { Battle } from '../models/Battle';

export interface BattleRepository {
  getBattlesByEventId(eventId: string): Promise<Battle[]>;
  getBattleById(id: string): Promise<Battle | null>;
  saveBattle(battle: Partial<Battle>): Promise<Battle>;
  updateBattle(id: string, battle: Partial<Battle>): Promise<Battle>;
  deleteBattle(id: string): Promise<void>;
}