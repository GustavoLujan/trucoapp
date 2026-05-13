import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/game';
import type { TeamScoreProps } from '../../types/game';
import { TantoMarks } from './TantoMarks';

export function TeamScore({ team, winningScore, isWinner }: TeamScoreProps) {
  return (
    <View style={[styles.container, isWinner && styles.winnerHighlight]} testID={`team-score-${team.id}`}>
      <Text style={[styles.label, isWinner && styles.winnerLabel]}>{team.label}</Text>
      <Text style={[styles.score, isWinner && styles.winnerScore]}>{team.score}</Text>
      <View style={styles.marksContainer}>
        <TantoMarks score={team.score} winningScore={winningScore} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.green,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minHeight: 200,
  },
  winnerHighlight: {
    backgroundColor: COLORS.greenLight,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  label: {
    color: COLORS.chalk,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  winnerLabel: {
    color: COLORS.accent,
  },
  score: {
    color: COLORS.chalk,
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 56,
  },
  winnerScore: {
    color: COLORS.accent,
  },
  marksContainer: {
    marginTop: 8,
    width: '100%',
  },
});
