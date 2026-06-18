import { useState, useEffect, useCallback } from 'react';
import { Event } from '../../domain/models/Event';
import { createEventUseCase, eventRepository } from '../../application/servicesContainer';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await eventRepository.getAllEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCreateEvent = async (title: string, location?: string, date?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newEvent = await createEventUseCase.execute({ title, location, date });
      setEvents((prevEvents) => [newEvent, ...prevEvents]);
      return newEvent;
    } catch (err: any) {
      setError(err.message || 'Failed to create event.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    events,
    isLoading,
    error,
    refreshEvents: fetchEvents,
    createNewEvent: handleCreateEvent,
  };
};