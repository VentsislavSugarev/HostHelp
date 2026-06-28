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

  async getParticipantById(id: string): Promise<BattleParticipant | null> {
    const { data, error } = await supabase
      .from('battle_participants')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as BattleParticipant;
  }

  async saveParticipant(participant: Partial<BattleParticipant>): Promise<BattleParticipant> {
    const { data, error } = await supabase
      .from('battle_participants')
      .insert(participant)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as BattleParticipant;
  }

  async updateParticipant(id: string, participant: Partial<BattleParticipant>): Promise<BattleParticipant> {
    const { data, error } = await supabase
      .from('battle_participants')
      .update(participant)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as BattleParticipant;
  }

  async deleteParticipant(id: string): Promise<void> {
    const { error } = await supabase
      .from('battle_participants')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}