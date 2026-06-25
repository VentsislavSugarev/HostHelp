import { BattleParticipant } from '../models/BattleParticipant';

export interface BattleParticipantRepository {
  getParticipantsByBattleId(battleId: string): Promise<BattleParticipant[]>;
  getParticipantById(id: string): Promise<BattleParticipant | null>;
  saveParticipant(participant: Partial<BattleParticipant>): Promise<BattleParticipant>;
  updateParticipant(id: string, participant: Partial<BattleParticipant>): Promise<BattleParticipant>;
  deleteParticipant(id: string): Promise<void>;
}