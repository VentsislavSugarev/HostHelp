import { useState, useCallback } from 'react';
import { Battle } from '../../domain/models/Battle';
import { battleRepository } from '../../application/servicesContainer';
import { generateInitialPairsUseCase, resolveBattleWinnerUseCase } from '../../application/servicesContainer';

export const useBattles = (eventId: string) => {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBattles = useCallback(async () => {
    if (!eventId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await battleRepository.getBattlesByTournamentId(eventId);
      setBattles(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch battles.');
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  const generateMatchups = async (mcIds: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const newBattles = await generateInitialPairsUseCase.execute(eventId, mcIds);
      setBattles(newBattles);
    } catch (err: any) {
      setError(err.message || 'Failed to generate matchups.');
    } finally {
      setIsLoading(false);
    }
  };

  const voteWinner = async (battleId: string, isReplica: boolean, winnerMcId: string | null) => {
    setIsLoading(true);
    setError(null);
    try {
      await resolveBattleWinnerUseCase.execute({ battleId, isReplica, winnerMcId });
      await fetchBattles();
    } catch (err: any) {
      setError(err.message || 'Failed to resolve battle winner.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    battles,
    isLoading,
    error,
    loadBattles: fetchBattles,
    generateMatchups,
    voteWinner,
  };
};