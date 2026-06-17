import { supabase } from '../../database/supabase';
import { Mc } from '../../../domain/models/Mc';
import { McRepository } from '../../../domain/repositories/McRepository';

export class SupabaseMcRepository implements McRepository {
  async getAllMcs(): Promise<Mc[]> {
    const { data, error } = await supabase
      .from('mcs')
      .select('*')
      .order('aka', { ascending: true });

    if (error) throw new Error(error.message);

    return (data || []).map(row => ({
      id: row.id,
      name: row.real_name || '', 
      aka: row.aka || '',
      points: 0,                 
      isAvailable: true,         
      createdAt: new Date(row.created_at)
    }));
  }

  async getMcById(id: string): Promise<Mc | null> {
    const { data, error } = await supabase
      .from('mcs')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.real_name || '',
      aka: data.aka || '',
      points: 0,
      isAvailable: true,
      createdAt: new Date(data.created_at)
    };
  }

  async saveMc(mc: Partial<Mc>): Promise<Mc> {
    const { data, error } = await supabase
      .from('mcs')
      .insert({
        real_name: mc.name || '', 
        aka: mc.aka || ''
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      id: data.id,
      name: data.real_name || '',
      aka: data.aka || '',
      points: 0,
      isAvailable: true,
      createdAt: new Date(data.created_at)
    };
  }

  async updateMcStatus(id: string, isAvailable: boolean): Promise<void> {
    return Promise.resolve();
  }

  async updateMcPoints(id: string, points: number): Promise<void> {
    return Promise.resolve();
  }
}