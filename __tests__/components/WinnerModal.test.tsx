import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { WinnerModal } from '../../src/components/WinnerModal/WinnerModal';

describe('WinnerModal', () => {
  it('is not visible when visible=false', () => {
    const { queryByText } = render(
      <WinnerModal
        visible={false}
        winner="nosotros"
        nosotrosScore={15}
        ellosScore={8}
        onNewGame={jest.fn()}
      />
    );
    expect(queryByText('¡Ganaron!')).toBeNull();
  });

  it('shows winner label when visible=true', () => {
    const { getByText } = render(
      <WinnerModal
        visible={true}
        winner="nosotros"
        nosotrosScore={15}
        ellosScore={8}
        onNewGame={jest.fn()}
      />
    );
    expect(getByText('Nosotros')).toBeTruthy();
    expect(getByText('¡Ganaron!')).toBeTruthy();
  });

  it('shows scores', () => {
    const { getByText } = render(
      <WinnerModal
        visible={true}
        winner="ellos"
        nosotrosScore={10}
        ellosScore={15}
        onNewGame={jest.fn()}
      />
    );
    expect(getByText('10 — 15')).toBeTruthy();
  });

  it('calls onNewGame when button is pressed', () => {
    const onNewGame = jest.fn();
    const { getByTestId } = render(
      <WinnerModal
        visible={true}
        winner="ellos"
        nosotrosScore={10}
        ellosScore={15}
        onNewGame={onNewGame}
      />
    );
    fireEvent.press(getByTestId('new-game-button'));
    expect(onNewGame).toHaveBeenCalledTimes(1);
  });

  it('shows Ellos as winner', () => {
    const { getByText } = render(
      <WinnerModal
        visible={true}
        winner="ellos"
        nosotrosScore={12}
        ellosScore={15}
        onNewGame={jest.fn()}
      />
    );
    expect(getByText('Ellos')).toBeTruthy();
  });
});
