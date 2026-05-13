import React from 'react';
import { StyleSheet, View } from 'react-native';

const SQ = 56;
const STICK = 6;
const HEAD_D = 11;
const HEAD_R = HEAD_D / 2;
const DIAG_LEN = Math.round(SQ * 1.414);

export type SquareState = 'complete' | 'active' | 'dimmed';

export interface MatchSquareProps {
  state: SquareState;
  gold?: boolean;
}

export function getSlotState(sectionScore: number, slotIndex: number): SquareState {
  if (sectionScore >= (slotIndex + 1) * 5) return 'complete';
  if (sectionScore > slotIndex * 5) return 'active';
  return 'dimmed';
}

export function MatchSquare({ state: squareState, gold = false }: MatchSquareProps) {
  const isComplete = squareState === 'complete';
  const isDimmed = squareState === 'dimmed';

  const stick = isComplete
    ? (gold ? '#A08030' : '#A07020')
    : (gold ? '#C8A951' : '#C8962E');
  const head = gold ? '#8B4500' : '#CC1800';

  return (
    <View style={[styles.wrap, isDimmed && styles.dimmed]} testID="match-square">
      <View style={[styles.topBar,    { backgroundColor: stick }]} />
      <View style={[styles.bottomBar, { backgroundColor: stick }]} />
      <View style={[styles.leftBar,   { backgroundColor: stick }]} />
      <View style={[styles.rightBar,  { backgroundColor: stick }]} />
      <View style={[styles.head, styles.headTL, { backgroundColor: head }]} />
      <View style={[styles.head, styles.headTR, { backgroundColor: head }]} />
      <View style={[styles.head, styles.headBL, { backgroundColor: head }]} />
      <View style={[styles.head, styles.headBR, { backgroundColor: head }]} />
      {isComplete && (
        <>
          <View style={[styles.diagonal, { backgroundColor: stick }]} />
          <View style={[styles.head, styles.headTR, { backgroundColor: head }]} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: SQ,
    height: SQ,
  },
  dimmed: {
    opacity: 0.18,
  },
  topBar: {
    position: 'absolute',
    top: 2,
    left: HEAD_R - 1,
    right: HEAD_R - 1,
    height: STICK,
    borderRadius: 3,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 2,
    left: HEAD_R - 1,
    right: HEAD_R - 1,
    height: STICK,
    borderRadius: 3,
  },
  leftBar: {
    position: 'absolute',
    left: 2,
    top: HEAD_R - 1,
    bottom: HEAD_R - 1,
    width: STICK,
    borderRadius: 3,
  },
  rightBar: {
    position: 'absolute',
    right: 2,
    top: HEAD_R - 1,
    bottom: HEAD_R - 1,
    width: STICK,
    borderRadius: 3,
  },
  head: {
    position: 'absolute',
    width: HEAD_D,
    height: HEAD_D,
    borderRadius: HEAD_R,
  },
  headTL: { top: 0,    left: 0  },
  headTR: { top: 0,    right: 0 },
  headBL: { bottom: 0, left: 0  },
  headBR: { bottom: 0, right: 0 },
  diagonal: {
    position: 'absolute',
    width: DIAG_LEN,
    height: STICK,
    borderRadius: 3,
    top: (SQ - STICK) / 2,
    left: (SQ - DIAG_LEN) / 2,
    transform: [{ rotate: '-45deg' }],
  },
});
