import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { TeamId } from '../../types/game';
import { TeamScore } from './TeamScore';

interface ScoreDisplayProps {
  nosotros: { id: string; label: string; score: number };
  ellos:    { id: string; label: string; score: number };
  winningScore: number;
  winner: TeamId | null;
  status: 'playing' | 'won';
  onAdd: (team: TeamId, points: 1) => void;
  onSubtract: (team: TeamId) => void;
}

export function ScoreDisplay({
  nosotros, ellos, winningScore, winner, status, onAdd, onSubtract,
}: ScoreDisplayProps) {
  const disabled = status === 'won';

  return (
    <View style={styles.container} testID="score-display">
      <TeamScore
        {...nosotros}
        winningScore={winningScore}
        isWinner={winner === 'nosotros'}
        onAdd={() => onAdd('nosotros', 1)}
        onSubtract={() => onSubtract('nosotros')}
        disabled={disabled}
      />
      <TeamScore
        {...ellos}
        winningScore={winningScore}
        isWinner={winner === 'ellos'}
        onAdd={() => onAdd('ellos', 1)}
        onSubtract={() => onSubtract('ellos')}
        disabled={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 12,
  },
});
