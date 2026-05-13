import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../../constants/game';
import type { PointButtonProps } from '../../types/game';

export function PointButton({ label, onPress, disabled = false, variant = 'primary' }: PointButtonProps) {
  const bgColor = variant === 'danger' ? COLORS.danger : COLORS.accent;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: bgColor },
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      testID={`point-button-${label}`}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 64,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  disabled: {
    opacity: 0.35,
  },
  label: {
    color: COLORS.bg,
    fontSize: 18,
    fontWeight: '800',
  },
});
