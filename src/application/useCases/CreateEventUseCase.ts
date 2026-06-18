import { EventRepository } from '../../domain/repositories/EventRepository';
import { Event } from '../../domain/models/Event';

interface CreateEventInput {
  title: string;
  location?: string;
  date?: string;
}

export class CreateEventUseCase {
  constructor(private eventRepository: EventRepository) {}

  async execute(input: CreateEventInput): Promise<Event> {
    if (!input.title.trim()) {
      throw new Error('Event title is required.');
    }

    const newEvent: Partial<Event> = {
      title: input.title,
      location: input.location || 'Park',
      status: 'draft',
      date: input.date || new Date().toISOString().split('T')[0],
      organization_id: '00000000-0000-0000-0000-000000000001' // ID de tu seed data
    };

    return await this.eventRepository.createEvent(newEvent);
  }
}