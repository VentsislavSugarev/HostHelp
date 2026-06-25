import { EventRegistration } from '../models/EventRegistration';

export interface EventRegistrationRepository {
  getRegistrationsByEventId(eventId: string): Promise<EventRegistration[]>;
  getRegistrationById(id: string): Promise<EventRegistration | null>;
  saveRegistration(registration: Partial<EventRegistration>): Promise<EventRegistration>;
  deleteRegistration(id: string): Promise<void>;
}