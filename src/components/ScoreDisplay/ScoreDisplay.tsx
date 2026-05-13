import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { GameState } from '../../types/game';
import { TeamScore } from './TeamScore';

interface ScoreDisplayProps {
  state: GameState;
  winningScore: number;
}

export function ScoreDisplay({ state, winningScore }: ScoreDisplayProps) {
  return (
    <View style={styles.container} testID="score-display">
      <TeamScore
        team={state.nosotros}
        winningScore={winningScore}
        isWinner={state.winner === 'nosotros'}
      />
      <View style={styles.divider} />
      <TeamScore
        team={state.ellos}
        winningScore={winningScore}
        isWinner={state.winner === 'ellos'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
  },
  divider: {
    width: 2,
    backgroundColor: 'transparent',
  },
});
