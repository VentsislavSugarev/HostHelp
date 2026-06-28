import { EventRepository } from '../../../domain/repositories/EventRepository';
import { Event } from '../../../domain/models/Event';
import { supabase } from '../../database/supabase';

export class SupabaseEventRepository implements EventRepository {
  async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Event[];
  }

  async getEventById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Event;
  }

  async saveEvent(event: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert(event)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Event;
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Event;
  }

  async deleteEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}