// src/presentation/screens/EventDetailScreen.tsx

import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useBattles } from '../hooks/useBattles';
import { Battle } from '../../domain/models/Battle';

interface EventDetailScreenProps {
  eventId: string;
  onBack: () => void;
}

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({ eventId, onBack }) => {
  const { battles, isLoading, error, loadBattles, generateMatchups } = useBattles(eventId);

  // Cargamos las batallas del evento nada más entrar
  useEffect(() => {
    loadBattles();
  }, [loadBattles]);

  // Simulamos unos IDs de MCs locales de prueba para el Shuffling aleatorio
  const handleStartTournament = async () => {
    const mockMcIds = [
      'mc-uuid-1-chuty',
      'mc-uuid-2-gazir',
      'mc-uuid-3-aczino',
      'mc-uuid-4-wos'
    ];
    await generateMatchups(mockMcIds);
  };

  const renderBattleCard = ({ item, index }: { item: Battle; index: number }) => (
    <View style={styles.battleCard}>
      <Text style={styles.battleNumber}>BATTLE #{index + 1}</Text>
      <View style={styles.matchupContainer}>
        <Text style={styles.mcText}>🎤 Competidor 1</Text>
        <Text style={styles.vsText}>VS</Text>
        <Text style={styles.mcText}>🎤 Competidor 2</Text>
      </View>
      <Text style={styles.battleStatus}>Status: {item.status}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Botón de Atrás */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>⬅️ Back to Events</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Event Dashboard</Text>
        <Text style={styles.subtitle}>ID: {eventId}</Text>
      </View>

      {error && <Text style={styles.errorText}>⚠️ {error}</Text>}

      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#FF3B30" />
          <Text style={styles.loadingText}>Loading brackets...</Text>
        </View>
      ) : (
        <FlatList
          data={battles}
          keyExtractor={(item) => item.id}
          renderItem={renderBattleCard}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No brackets generated for this event yet.</Text>
              <TouchableOpacity style={styles.generateButton} onPress={handleStartTournament}>
                <Text style={styles.generateButtonText}>⚡ Generate Random Matchups</Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  backButton: { padding: 16 },
  backButtonText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 16 },
  header: { paddingHorizontal: 20, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 4 },
  list: { paddingHorizontal: 20 },
  battleCard: { backgroundColor: '#1E1E1E', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  battleNumber: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  matchupContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 8 },
  mcText: { color: '#FFF', fontSize: 15, fontWeight: '500' },
  vsText: { color: '#666', fontWeight: 'bold', fontStyle: 'italic' },
  battleStatus: { color: '#AAA', fontSize: 12, marginTop: 8, textAlign: 'right' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { color: '#AAA', marginTop: 10 },
  errorText: { color: '#FF3B30', textAlign: 'center', marginVertical: 10 },
  emptyContainer: { alignItems: 'center', marginTop: 40 },
  emptyText: { color: '#666', textAlign: 'center', marginBottom: 20 },
  generateButton: { backgroundColor: '#FF3B30', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 8 },
  generateButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});