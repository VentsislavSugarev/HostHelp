import { Event } from '../models/Event';

export interface EventRepository {
  getEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | null>;
  saveEvent(event: Partial<Event>): Promise<Event>;
  updateEvent(id: string, event: Partial<Event>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;
}