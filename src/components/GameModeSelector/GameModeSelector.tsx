import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/game';
import type { GameModeSelectorProps } from '../../types/game';

export function GameModeSelector({ mode, onChange, disabled }: GameModeSelectorProps) {
  return (
    <View style={styles.container} testID="game-mode-selector">
      <Pressable
        style={[styles.option, mode === 'short' && styles.active, disabled && styles.disabled]}
        onPress={() => !disabled && onChange('short')}
        testID="mode-short"
      >
        <Text style={[styles.text, mode === 'short' && styles.activeText]}>15 pts</Text>
      </Pressable>
      <Pressable
        style={[styles.option, mode === 'long' && styles.active, disabled && styles.disabled]}
        onPress={() => !disabled && onChange('long')}
        testID="mode-long"
      >
        <Text style={[styles.text, mode === 'long' && styles.activeText]}>30 pts</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: 10,
    padding: 4,
    alignSelf: 'center',
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  active: {
    backgroundColor: COLORS.accent,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.textMuted,
    fontWeight: '600',
    fontSize: 14,
  },
  activeText: {
    color: COLORS.bg,
  },
});
