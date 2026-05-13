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
  partialCount?: number;
}

export function getSlotState(sectionScore: number, slotIndex: number): SquareState {
  if (sectionScore >= (slotIndex + 1) * 5) return 'complete';
  if (sectionScore > slotIndex * 5) return 'active';
  return 'dimmed';
}

export function MatchSquare({ state: squareState, gold = false, partialCount = 0 }: MatchSquareProps) {
  const isComplete = squareState === 'complete';
  const isDimmed = squareState === 'dimmed';
  const isActive = squareState === 'active';

  const stick = isComplete
    ? (gold ? '#A08030' : '#A07020')
    : (gold ? '#C8A951' : '#C8962E');
  const head = gold ? '#8B4500' : '#CC1800';

  // Bars revealed one at a time: top → left → bottom → right → diagonal
  const showTop    = isComplete || isDimmed || (isActive && partialCount >= 1);
  const showLeft   = isComplete || isDimmed || (isActive && partialCount >= 2);
  const showBottom = isComplete || isDimmed || (isActive && partialCount >= 3);
  const showRight  = isComplete || isDimmed || (isActive && partialCount >= 4);

  const showHeadTL = showTop || showLeft;
  const showHeadTR = showTop || showRight;
  const showHeadBL = showBottom || showLeft;
  const showHeadBR = showBottom || showRight;

  return (
    <View style={[styles.wrap, isDimmed && styles.dimmed]} testID="match-square">
      {showTop    && <View style={[styles.topBar,    { backgroundColor: stick }]} />}
      {showBottom && <View style={[styles.bottomBar, { backgroundColor: stick }]} />}
      {showLeft   && <View style={[styles.leftBar,   { backgroundColor: stick }]} />}
      {showRight  && <View style={[styles.rightBar,  { backgroundColor: stick }]} />}
      {showHeadTL && <View style={[styles.head, styles.headTL, { backgroundColor: head }]} />}
      {showHeadTR && <View style={[styles.head, styles.headTR, { backgroundColor: head }]} />}
      {showHeadBL && <View style={[styles.head, styles.headBL, { backgroundColor: head }]} />}
      {showHeadBR && <View style={[styles.head, styles.headBR, { backgroundColor: head }]} />}
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
