import { supabase } from '../../database/supabase';import { Battle } from '../../../domain/models/Battle';
import { BattleRepository } from '../../../domain/repositories/BattleRepository';

export class SupabaseBattleRepository implements BattleRepository {
  async getBattleById(id: string): Promise<Battle | null> {
    const { data, error } = await supabase
      .from('battles')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      tournamentId: data.event_id,
      status: 'PENDING',
      winnerId: data.winning_team,
      isReplica: data.result_type === 'REPLICA',
      createdAt: new Date(data.created_at)
    };
  }

  async getBattlesByTournamentId(tournamentId: string): Promise<Battle[]> {
    const { data, error } = await supabase
      .from('battles')
      .select('*')
      .eq('event_id', tournamentId);

    if (error) throw new Error(error.message);

    return (data || []).map(row => ({
      id: row.id,
      tournamentId: row.event_id,
      status: 'PENDING',
      winnerId: row.winning_team,
      isReplica: row.result_type === 'REPLICA',
      createdAt: new Date(row.created_at)
    }));
  }

  async createBattle(battle: Partial<Battle>): Promise<Battle> {
    const { data, error } = await supabase
      .from('battles')
      .insert({
        event_id: battle.tournamentId || '00000000-0000-0000-0000-000000000000',
        battle_order: 1,
        stage: 'Clasificatoria',
        format_type: 'FMS',
        result_type: battle.isReplica ? 'REPLICA' : 'NORMAL',
        winning_team: battle.winnerId || null
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      id: data.id,
      tournamentId: data.event_id,
      status: 'PENDING',
      winnerId: data.winning_team,
      isReplica: data.result_type === 'REPLICA',
      createdAt: new Date(data.created_at)
    };
  }

  async updateBattleStatus(id: string, status: Battle['status'], winnerId: string | null): Promise<void> {
    const { error } = await supabase
      .from('battles')
      .update({ winning_team: winnerId })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async setReplicaFlag(id: string, isReplica: boolean): Promise<void> {
    const { error } = await supabase
      .from('battles')
      .update({ result_type: isReplica ? 'REPLICA' : 'NORMAL' })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }

  async deleteBattle(id: string): Promise<void> {
    const { error } = await supabase
      .from('battles')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}