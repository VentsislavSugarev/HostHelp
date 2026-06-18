import { EventRepository } from '../../../domain/repositories/EventRepository';
import { Event } from '../../../domain/models/Event';
import { supabase } from '../../database/supabase';

export class SupabaseEventRepository implements EventRepository {
  async getAllEvents(): Promise<Event[]> {
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

  async createEvent(event: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert(event as any)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Event;
  }

  async updateEventStatus(id: string, status: Event['status']): Promise<void> {
    const { error } = await supabase
      .from('events')
      .update({ status })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}