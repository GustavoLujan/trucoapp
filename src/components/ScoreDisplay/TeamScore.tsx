import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
  onEditName?: () => void;
}

export function TeamScore({
  id, label, score, winningScore, isWinner, onAdd, onSubtract, disabled, onEditName,
}: TeamScoreProps) {
  const inBuenas = winningScore > 15 && score > 15;
  const activeSectionScore = inBuenas ? score - 15 : score;
  const isGold = inBuenas;
  const sectionLabel = inBuenas ? 'BUENAS' : 'MALAS';
  const headerColor = TEAM_COLORS[id] ?? '#444';

  return (
    <View style={[styles.container, isWinner && styles.winnerBorder]} testID={`team-score-${id}`}>

      <Pressable
        style={[styles.header, { backgroundColor: headerColor }]}
        onPress={onEditName}
        disabled={!onEditName}
      >
        <Text style={styles.teamName}>{label.toUpperCase()}</Text>
        {onEditName && <Text style={styles.editHint}>✎</Text>}
      </Pressable>

      <View style={styles.sections}>
        {inBuenas && <Text style={styles.malasBadge}>MALAS ✓</Text>}
        <Text style={[styles.sectionLabel, isGold && styles.sectionLabelGold]}>{sectionLabel}</Text>
        <View style={styles.squaresCol}>
          {[0, 1, 2].map(i => {
            const slotState = getSlotState(activeSectionScore, i);
            const slotStart = i * 5;
            const partial = slotState === 'active' ? activeSectionScore - slotStart : 0;
            return <MatchSquare key={i} state={slotState} partialCount={partial} gold={isGold} />;
          })}
        </View>
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
    paddingHorizontal: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  teamName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 3,
  },
  editHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
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
  malasBadge: {
    color: '#6a9a60',
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 2,
  },
  sectionLabel: {
    color: '#6a9a60',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 3,
  },
  sectionLabelGold: {
    color: '#a09030',
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
