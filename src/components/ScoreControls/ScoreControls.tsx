import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { TeamId } from '../../types/game';
import { PointButton } from './PointButton';

interface ScoreControlsProps {
  onAdd: (team: TeamId, points: 1 | 2 | 3) => void;
  onSubtract: (team: TeamId) => void;
  disabled: boolean;
}

function TeamControls({
  team,
  onAdd,
  onSubtract,
  disabled,
}: {
  team: TeamId;
  onAdd: (team: TeamId, points: 1 | 2 | 3) => void;
  onSubtract: (team: TeamId) => void;
  disabled: boolean;
}) {
  return (
    <View style={styles.teamControls}>
      <PointButton label="+1" onPress={() => onAdd(team, 1)} disabled={disabled} />
      <PointButton label="+2" onPress={() => onAdd(team, 2)} disabled={disabled} />
      <PointButton label="+3" onPress={() => onAdd(team, 3)} disabled={disabled} />
      <PointButton
        label="-1"
        onPress={() => onSubtract(team)}
        disabled={disabled}
        variant="danger"
      />
    </View>
  );
}

export function ScoreControls({ onAdd, onSubtract, disabled }: ScoreControlsProps) {
  return (
    <View style={styles.container} testID="score-controls">
      <TeamControls team="nosotros" onAdd={onAdd} onSubtract={onSubtract} disabled={disabled} />
      <View style={styles.separator} />
      <TeamControls team="ellos" onAdd={onAdd} onSubtract={onSubtract} disabled={disabled} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  teamControls: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  separator: {
    width: 2,
  },
});
