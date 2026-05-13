import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/game';
import type { TantoMarksProps } from '../../types/game';

const MARK_WIDTH = 4;
const MARK_HEIGHT = 32;
const MARK_GAP = 5;
const GROUP_WIDTH = 4 * MARK_WIDTH + 3 * MARK_GAP + 14;

function TallyGroup({ count }: { count: number }) {
  const verticals = Math.min(count, 4);
  const hasDiagonal = count === 5;

  return (
    <View style={styles.group} testID="tally-group">
      {Array.from({ length: 4 }).map((_, i) => (
        <View
          key={i}
          testID="tally-mark"
          style={[styles.vertical, i < verticals ? styles.markActive : styles.markEmpty]}
        />
      ))}
      {hasDiagonal && <View style={styles.diagonal} testID="tally-diagonal" />}
    </View>
  );
}

export function TantoMarks({ score, winningScore, color }: TantoMarksProps) {
  const totalGroups = Math.ceil(winningScore / 5);
  const fullGroups = Math.floor(score / 5);
  const remainder = score % 5;

  const markColor = color ?? COLORS.chalk;

  return (
    <View style={styles.container} testID="tanto-marks">
      {Array.from({ length: totalGroups }).map((_, groupIndex) => {
        let groupCount: number;
        if (groupIndex < fullGroups) {
          groupCount = 5;
        } else if (groupIndex === fullGroups) {
          groupCount = remainder;
        } else {
          groupCount = 0;
        }
        return (
          <View key={groupIndex} style={[styles.groupWrapper, { width: GROUP_WIDTH }]}>
            <TallyGroup count={groupCount} />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  groupWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    height: MARK_HEIGHT + 8,
    position: 'relative',
    gap: MARK_GAP,
    paddingHorizontal: 4,
  },
  vertical: {
    width: MARK_WIDTH,
    height: MARK_HEIGHT,
    borderRadius: 2,
  },
  markActive: {
    backgroundColor: COLORS.chalk,
  },
  markEmpty: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.chalkDim + '40',
  },
  diagonal: {
    position: 'absolute',
    width: GROUP_WIDTH,
    height: MARK_WIDTH,
    backgroundColor: COLORS.chalk,
    borderRadius: 2,
    top: (MARK_HEIGHT + 8) / 2 - MARK_WIDTH / 2,
    left: 0,
    transform: [{ rotate: '-20deg' }],
  },
});
