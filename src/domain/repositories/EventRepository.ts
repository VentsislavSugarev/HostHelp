import { Event } from '../models/Event';

export interface EventRepository {
  getAllEvents(): Promise<Event[]>;
  getEventById(id: string): Promise<Event | null>;
  createEvent(event: Partial<Event>): Promise<Event>;
  updateEventStatus(id: string, status: Event['status']): Promise<void>;
}