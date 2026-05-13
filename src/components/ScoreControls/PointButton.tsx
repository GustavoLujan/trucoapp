import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/game';

export interface PointButtonProps {
  icon: 'plus' | 'minus';
  onPress: () => void;
  disabled?: boolean;
}

function PlusIcon() {
  return (
    <View style={iconStyles.wrap}>
      <View style={iconStyles.hBar} />
      <View style={iconStyles.vBar} />
    </View>
  );
}

function MinusIcon() {
  return <View style={iconStyles.hBar} />;
}

export function PointButton({ icon, onPress, disabled = false }: PointButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
      testID={`point-button-${icon}`}
      accessibilityRole="button"
    >
      {icon === 'plus' ? <PlusIcon /> : <MinusIcon />}
    </Pressable>
  );
}

const iconStyles = StyleSheet.create({
  wrap: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hBar: {
    position: 'absolute',
    width: 22,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#111',
  },
  vBar: {
    position: 'absolute',
    width: 3,
    height: 22,
    borderRadius: 1.5,
    backgroundColor: '#111',
  },
});

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.95 }],
  },
  disabled: {
    opacity: 0.35,
  },
});
