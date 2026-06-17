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
      status: 'DRAFT',
      date: input.date || new Date().toISOString().split('T')[0]
    };

    return await this.eventRepository.createEvent(newEvent);
  }
}