import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PointButton } from '../ScoreControls/PointButton';
import { MatchSquare, getSlotState } from './MatchSquare';

const TEAM_COLORS: Record<string, string> = {
  nosotros: '#1a4a99',
  ellos:    '#991a1a',
};

export interface TeamScoreProps {
  id: string;
  label: string;
  score: number;
  winningScore: number;
  isWinner: boolean;
  onAdd: () => void;
  onSubtract: () => void;
  disabled: boolean;
}

export function TeamScore({
  id, label, score, winningScore, isWinner, onAdd, onSubtract, disabled,
}: TeamScoreProps) {
  const isLongGame = winningScore > 15;
  const malasScore  = Math.min(score, 15);
  const buenasScore = Math.max(score - 15, 0);
  const headerColor = TEAM_COLORS[id] ?? '#444';

  return (
    <View style={[styles.container, isWinner && styles.winnerBorder]} testID={`team-score-${id}`}>

      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <Text style={styles.teamName}>{label.toUpperCase()}</Text>
      </View>

      <View style={styles.sections}>

        <Text style={styles.labelMalas}>MALAS</Text>
        <View style={styles.squaresCol}>
          {[0, 1, 2].map(i => (
            <MatchSquare key={i} state={getSlotState(malasScore, i)} gold={false} />
          ))}
        </View>

        {isLongGame && (
          <>
            <View style={styles.divider} />
            <Text style={styles.labelBuenas}>BUENAS</Text>
            <View style={styles.squaresCol}>
              {[0, 1, 2].map(i => (
                <MatchSquare key={i} state={getSlotState(buenasScore, i)} gold />
              ))}
            </View>
          </>
        )}

      </View>

      <Text style={[styles.score, { color: headerColor }]}>{score}</Text>

      <View style={styles.buttons}>
        <PointButton icon="minus" onPress={onSubtract} disabled={disabled} />
        <PointButton icon="plus"  onPress={onAdd}      disabled={disabled} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#222',
  },
  winnerBorder: {
    borderColor: '#C8A951',
    borderWidth: 2,
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  teamName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 3,
  },
  sections: {
    backgroundColor: '#111a0f',
    paddingVertical: 10,
    paddingHorizontal: 6,
    alignItems: 'center',
    gap: 6,
  },
  squaresCol: {
    alignItems: 'center',
    gap: 5,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: '#1e2e18',
    marginVertical: 4,
  },
  labelMalas: {
    color: '#6a9a60',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 3,
  },
  labelBuenas: {
    color: '#a09030',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 3,
  },
  score: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    paddingVertical: 6,
    backgroundColor: '#0e0e0e',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingBottom: 14,
    paddingTop: 2,
    backgroundColor: '#0e0e0e',
  },
});
