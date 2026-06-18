import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EventsScreen } from './src/presentation/screens/EventsScreen';
import { EventDetailScreen } from './src/presentation/screens/EventDetailScreen';

// Definimos los nombres de nuestras pantallas disponibles
type ScreenName = 'EVENTS_LIST' | 'EVENT_DETAILS';

export default function App() {
  // Guardamos en el estado en qué pantalla estamos y qué ID de evento tenemos seleccionado
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('EVENTS_LIST');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Función de navegación para ir a los detalles de un evento
  const navigateToEventDetails = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentScreen('EVENT_DETAILS');
  };

  // Función de navegación para volver atrás
  const navigateToEventsList = () => {
    setSelectedEventId(null);
    setCurrentScreen('EVENTS_LIST');
  };

  return (
    <SafeAreaProvider>
      {currentScreen === 'EVENTS_LIST' && (
        <EventsScreen onSelectEvent={navigateToEventDetails} />
      )}

      {currentScreen === 'EVENT_DETAILS' && selectedEventId && (
        <EventDetailScreen 
          eventId={selectedEventId} 
          onBack={navigateToEventsList} 
        />
      )}
    </SafeAreaProvider>
  );
}