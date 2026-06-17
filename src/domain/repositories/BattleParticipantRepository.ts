import { BattleParticipant } from '../models/BattleParticipant';

export interface BattleParticipantRepository {
  getParticipantsByBattleId(battleId: string): Promise<BattleParticipant[]>;
  addParticipantsToBattle(participants: Partial<BattleParticipant>[]): Promise<BattleParticipant[]>;
  removeParticipantFromBattle(battleId: string, mcId: string): Promise<void>;
}