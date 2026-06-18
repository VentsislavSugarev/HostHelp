// src/presentation/screens/EventsScreen.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEvents } from '../hooks/useEvents';
import { Event } from '../../domain/models/Event';

interface EventsScreenProps {
  onSelectEvent: (eventId: string) => void;
}

export const EventsScreen: React.FC<EventsScreenProps> = ({ onSelectEvent }) => {
  const { events, isLoading, error, createNewEvent, refreshEvents } = useEvents();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      await createNewEvent(title, location || undefined);
      setTitle('');
      setLocation('');
    } catch (err) {
      // Error is already managed inside the hook's state
    }
  };

  const renderEventCard = ({ item }: { item: Event }) => {
    // Evitamos problemas de tipado dinámico indexando el estilo del badge de forma segura
    const statusStyle = (styles as any)[`badge${item.status}`] || styles.badgedraft;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => onSelectEvent(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={[styles.badge, statusStyle]}>
            <Text style={styles.badgeText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>
        <Text style={styles.cardLocation}>📍 {item.location || 'Unknown Location'}</Text>
        <Text style={styles.cardDate}>📅 {new Date(item.date).toLocaleDateString()}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Park Events</Text>
          <Text style={styles.headerSubtitle}>Manage your freestyle battles</Text>
        </View>

        {/* Formulario para añadir eventos */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Create New Event</Text>
          <TextInput
            style={styles.input}
            placeholder="Event Title (e.g., King of the Park #1)"
            placeholderTextColor="#666"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Location (e.g., Central Square)"
            placeholderTextColor="#666"
            value={location}
            onChangeText={setLocation}
          />
          <TouchableOpacity 
            style={[styles.button, !title.trim() && styles.buttonDisabled]} 
            onPress={handleCreate}
            disabled={!title.trim() || isLoading}
          >
            <Text style={styles.buttonText}>Host Event</Text>
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>⚠️ {error}</Text>}

        {/* Listado de eventos */}
        {isLoading && events.length === 0 ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#FF3B30" />
            <Text style={styles.loadingText}>Fetching events from park...</Text>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={renderEventCard}
            contentContainerStyle={styles.listContainer}
            refreshing={isLoading}
            onRefresh={refreshEvents}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No events hosted yet. Be the first host!</Text>
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Estilo oscuro underground
  },
  flex: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#AAA',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#1E1E1E',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FF3B30', // Rojo batalla
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF3B30',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
    marginRight: 8,
  },
  cardLocation: {
    color: '#CCC',
    fontSize: 14,
    marginBottom: 4,
  },
  cardDate: {
    color: '#666',
    fontSize: 12,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  // Adaptado a las restricciones minúsculas de tu BD en Supabase
  badgedraft: { backgroundColor: '#FFCC0020', borderColor: '#FFCC00', borderWidth: 1 },
  badgeactive: { backgroundColor: '#34C75920', borderColor: '#34C759', borderWidth: 1 },
  badgefinished: { backgroundColor: '#007AFF20', borderColor: '#007AFF', borderWidth: 1 },
  badgepublished: { backgroundColor: '#AF52DE20', borderColor: '#AF52DE', borderWidth: 1 },
  
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#AAA',
    marginTop: 10,
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 14,
  },
});