import { render } from '@testing-library/react-native';
import React from 'react';
import { TantoMarks } from '../../src/components/ScoreDisplay/TantoMarks';

describe('TantoMarks', () => {
  it('renders the correct number of groups for 15-point game', () => {
    const { getAllByTestId } = render(<TantoMarks score={0} winningScore={15} />);
    expect(getAllByTestId('tally-group').length).toBe(3);
  });

  it('renders 6 groups for 30-point game', () => {
    const { getAllByTestId } = render(<TantoMarks score={0} winningScore={30} />);
    expect(getAllByTestId('tally-group').length).toBe(6);
  });

  it('shows diagonal only for complete groups (score 5)', () => {
    const { getAllByTestId, queryAllByTestId } = render(
      <TantoMarks score={5} winningScore={15} />
    );
    expect(getAllByTestId('tally-diagonal').length).toBe(1);
    expect(queryAllByTestId('tally-diagonal').length).toBe(1);
  });

  it('shows no diagonals for score 0', () => {
    const { queryAllByTestId } = render(<TantoMarks score={0} winningScore={15} />);
    expect(queryAllByTestId('tally-diagonal').length).toBe(0);
  });

  it('shows 2 diagonals for score 10', () => {
    const { getAllByTestId } = render(<TantoMarks score={10} winningScore={15} />);
    expect(getAllByTestId('tally-diagonal').length).toBe(2);
  });

  it('renders without crashing for score 15', () => {
    const { getByTestId } = render(<TantoMarks score={15} winningScore={15} />);
    expect(getByTestId('tanto-marks')).toBeTruthy();
  });
});
