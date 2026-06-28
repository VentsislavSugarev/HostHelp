import { McRepository } from '../../../domain/repositories/McRepository';
import { Mc } from '../../../domain/models/Mc';
import { supabase } from '../../database/supabase';

export class SupabaseMcRepository implements McRepository {
  async getMcs(): Promise<Mc[]> {
    const { data, error } = await supabase
      .from('mcs')
      .select('*')
      .order('aka', { ascending: true });

    if (error) throw new Error(error.message);
    return data as Mc[];
  }

  async getMcById(id: string): Promise<Mc | null> {
    const { data, error } = await supabase
      .from('mcs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Mc;
  }

  async saveMc(mc: Partial<Mc>): Promise<Mc> {
    const { data, error } = await supabase
      .from('mcs')
      .insert(mc)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Mc;
  }

  async updateMc(id: string, mc: Partial<Mc>): Promise<Mc> {
    const { data, error } = await supabase
      .from('mcs')
      .update(mc)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Mc;
  }

  async deleteMc(id: string): Promise<void> {
    const { error } = await supabase
      .from('mcs')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}