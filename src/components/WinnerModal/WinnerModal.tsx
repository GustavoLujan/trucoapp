import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, TEAM_LABELS } from '../../constants/game';
import type { WinnerModalProps } from '../../types/game';

export function WinnerModal({ visible, winner, nosotrosScore, ellosScore, onNewGame, winnerLabel: winnerLabelProp }: WinnerModalProps) {
  const winnerLabel = winnerLabelProp ?? (winner ? TEAM_LABELS[winner] : '');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      testID="winner-modal"
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.trophy}>🏆</Text>
          <Text style={styles.title}>¡Ganaron!</Text>
          <Text style={styles.winnerName}>{winnerLabel}</Text>
          <Text style={styles.scores}>
            {nosotrosScore} — {ellosScore}
          </Text>
          <Pressable style={styles.button} onPress={onNewGame} testID="new-game-button">
            <Text style={styles.buttonText}>Nueva Partida</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  trophy: {
    fontSize: 60,
    marginBottom: 8,
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  winnerName: {
    color: COLORS.accent,
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 12,
  },
  scores: {
    color: COLORS.textMuted,
    fontSize: 20,
    marginBottom: 32,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: COLORS.bg,
    fontSize: 18,
    fontWeight: '800',
  },
});
