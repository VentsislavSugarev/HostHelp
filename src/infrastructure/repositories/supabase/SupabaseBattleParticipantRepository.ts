import { supabase } from '../../database/supabase';
import { BattleParticipant } from '../../../domain/models/BattleParticipant';
import { BattleParticipantRepository } from '../../../domain/repositories/BattleParticipantRepository';

export class SupabaseBattleParticipantRepository implements BattleParticipantRepository {
  async getParticipantsByBattleId(battleId: string): Promise<BattleParticipant[]> {
    const { data, error } = await supabase
      .from('battle_participants')
      .select('*')
      .eq('battle_id', battleId);

    if (error) throw new Error(error.message);

    return (data || []).map(row => ({
      id: row.id,
      battleId: row.battle_id,
      mcId: row.mc_id
    }));
  }

  async addParticipantsToBattle(participants: Partial<BattleParticipant>[]): Promise<BattleParticipant[]> {
    const payload = participants.map(p => ({
      battle_id: p.battleId || '00000000-0000-0000-0000-000000000000',
      mc_id: p.mcId || '00000000-0000-0000-0000-000000000000',
      team_number: 1
    }));

    const { data, error } = await supabase
      .from('battle_participants')
      .insert(payload)
      .select();

    if (error) throw new Error(error.message);

    return (data || []).map(row => ({
      id: row.id,
      battleId: row.battle_id,
      mcId: row.mc_id
    }));
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