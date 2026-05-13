import { render } from '@testing-library/react-native';
import React from 'react';
import { MatchSquare, getSlotState } from '../../src/components/ScoreDisplay/MatchSquare';

describe('getSlotState', () => {
  it('returns dimmed for score 0 on slot 0', () => {
    expect(getSlotState(0, 0)).toBe('dimmed');
  });

  it('returns active when slot is partially filled', () => {
    expect(getSlotState(3, 0)).toBe('active');
    expect(getSlotState(7, 1)).toBe('active');
  });

  it('returns complete when slot is fully filled', () => {
    expect(getSlotState(5,  0)).toBe('complete');
    expect(getSlotState(10, 1)).toBe('complete');
    expect(getSlotState(15, 2)).toBe('complete');
  });

  it('returns dimmed for slots not yet reached', () => {
    expect(getSlotState(5, 1)).toBe('dimmed');
    expect(getSlotState(5, 2)).toBe('dimmed');
  });
});

describe('MatchSquare', () => {
  it('renders without crashing (complete)', () => {
    const { getByTestId } = render(<MatchSquare state="complete" />);
    expect(getByTestId('match-square')).toBeTruthy();
  });

  it('renders without crashing (active)', () => {
    const { getByTestId } = render(<MatchSquare state="active" />);
    expect(getByTestId('match-square')).toBeTruthy();
  });

  it('renders without crashing (dimmed)', () => {
    const { getByTestId } = render(<MatchSquare state="dimmed" />);
    expect(getByTestId('match-square')).toBeTruthy();
  });

  it('renders gold variant without crashing', () => {
    const { getByTestId } = render(<MatchSquare state="complete" gold />);
    expect(getByTestId('match-square')).toBeTruthy();
  });
});
