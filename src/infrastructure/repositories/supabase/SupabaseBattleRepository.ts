import { BattleRepository } from '../../../domain/repositories/BattleRepository';
import { Battle, BattleResultType } from '../../../domain/models/Battle';
import { supabase } from '../../database/supabase';

export class SupabaseBattleRepository implements BattleRepository {
  async getBattleById(id: string): Promise<Battle | null> {
    const { data, error } = await supabase
      .from('battles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Battle;
  }

  async getBattlesByEventId(eventId: string): Promise<Battle[]> {
    const { data, error } = await supabase
      .from('battles')
      .select('*')
      .eq('event_id', eventId)
      .order('battle_order', { ascending: true });

    if (error) throw new Error(error.message);
    return data as Battle[];
  }

  async createBattle(battle: Partial<Battle>): Promise<Battle> {
    const { data, error } = await supabase
      .from('battles')
      .insert(battle as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Battle;
  }

  async updateBattleResult(id: string, resultType: BattleResultType, winningTeam: string | null): Promise<void> {
    const { error } = await supabase
      .from('battles')
      .update({
        result_type: resultType,
        winning_team: winningTeam
      })
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