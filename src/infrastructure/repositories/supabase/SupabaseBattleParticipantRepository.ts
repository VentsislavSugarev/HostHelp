import { BattleParticipantRepository } from '../../../domain/repositories/BattleParticipantRepository';
import { BattleParticipant } from '../../../domain/models/BattleParticipant';
import { supabase } from '../../database/supabase';

export class SupabaseBattleParticipantRepository implements BattleParticipantRepository {
  async getParticipantsByBattleId(battleId: string): Promise<BattleParticipant[]> {
    const { data, error } = await supabase
      .from('battle_participants')
      .select('*')
      .eq('battle_id', battleId);

    if (error) throw new Error(error.message);
    return data as BattleParticipant[];
  }

  async addParticipantsToBattle(participants: Partial<BattleParticipant>[]): Promise<BattleParticipant[]> {
    const { data, error } = await supabase
      .from('battle_participants')
      .insert(participants as any[])
      .select();

    if (error) throw new Error(error.message);
    return data as BattleParticipant[];
  }

  async removeParticipantFromBattle(battleId: string, mcId: string): Promise<void> {
    const { error } = await supabase
      .from('battle_participants')
      .delete()
      .eq('battle_id', battleId)
      .eq('mc_id', mcId);

    if (error) throw new Error(error.message);
  }
}