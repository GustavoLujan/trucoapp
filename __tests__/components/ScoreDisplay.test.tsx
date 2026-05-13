import { render } from '@testing-library/react-native';
import React from 'react';
import { ScoreDisplay } from '../../src/components/ScoreDisplay/ScoreDisplay';
import type { GameState } from '../../src/types/game';

const baseState: GameState = {
  nosotros: { id: 'nosotros', label: 'Nosotros', score: 7 },
  ellos: { id: 'ellos', label: 'Ellos', score: 3 },
  mode: 'short',
  status: 'playing',
  winner: null,
  roundNumber: 5,
};

describe('ScoreDisplay', () => {
  it('renders both team score blocks', () => {
    const { getByTestId } = render(<ScoreDisplay state={baseState} winningScore={15} />);
    expect(getByTestId('team-score-nosotros')).toBeTruthy();
    expect(getByTestId('team-score-ellos')).toBeTruthy();
  });

  it('displays score numbers for both teams', () => {
    const { getByText } = render(<ScoreDisplay state={baseState} winningScore={15} />);
    expect(getByText('7')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('displays team labels', () => {
    const { getByText } = render(<ScoreDisplay state={baseState} winningScore={15} />);
    expect(getByText('Nosotros')).toBeTruthy();
    expect(getByText('Ellos')).toBeTruthy();
  });
});
