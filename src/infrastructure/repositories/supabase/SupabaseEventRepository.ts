import { supabase } from '../../database/supabase';
import { Event } from '../../../domain/models/Event';
import { EventRepository } from '../../../domain/repositories/EventRepository';

export class SupabaseEventRepository implements EventRepository {
  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return (data || []).map(row => ({
      id: row.id,
      title: row.title,
      location: row.location,
      status: row.status as Event['status'],
      date: row.date,
      createdAt: new Date(row.created_at)
    }));
  }

  async getEventById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      title: data.title,
      location: data.location,
      status: data.status as Event['status'],
      date: data.date,
      createdAt: new Date(data.created_at)
    };
  }

  async createEvent(event: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert({
        title: event.title || 'Nuevo Evento',
        location: event.location || null,
        status: event.status || 'DRAFT',
        organization_id: '00000000-0000-0000-0000-000000000000', 
        date: event.date || new Date().toISOString().split('T')[0]
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      id: data.id,
      title: data.title,
      location: data.location,
      status: data.status as Event['status'],
      date: data.date,
      createdAt: new Date(data.created_at)
    };
  }

  async updateEventStatus(id: string, status: Event['status']): Promise<void> {
    const { error } = await supabase
      .from('events')
      .update({ status })
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}