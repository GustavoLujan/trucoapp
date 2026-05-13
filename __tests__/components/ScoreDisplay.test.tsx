import { render } from '@testing-library/react-native';
import React from 'react';
import { ScoreDisplay } from '../../src/components/ScoreDisplay/ScoreDisplay';

const baseProps = {
  nosotros: { id: 'nosotros', label: 'Nosotros', score: 7 },
  ellos:    { id: 'ellos',    label: 'Ellos',    score: 3 },
  winningScore: 15,
  winner: null,
  status: 'playing' as const,
  onAdd: jest.fn(),
  onSubtract: jest.fn(),
};

describe('ScoreDisplay', () => {
  it('renders both team score blocks', () => {
    const { getByTestId } = render(<ScoreDisplay {...baseProps} />);
    expect(getByTestId('team-score-nosotros')).toBeTruthy();
    expect(getByTestId('team-score-ellos')).toBeTruthy();
  });

  it('displays score numbers for both teams', () => {
    const { getByText } = render(<ScoreDisplay {...baseProps} />);
    expect(getByText('7')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
  });

  it('displays team labels', () => {
    const { getByText } = render(<ScoreDisplay {...baseProps} />);
    expect(getByText('NOSOTROS')).toBeTruthy();
    expect(getByText('ELLOS')).toBeTruthy();
  });
});
