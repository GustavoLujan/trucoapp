import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants/game';

interface HeaderProps {
  onNewGame: () => void;
}

export function Header({ onNewGame }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TRUCO</Text>
      <Pressable style={styles.newGameBtn} onPress={onNewGame} testID="header-new-game">
        <Text style={styles.newGameText}>Nueva</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 4,
  },
  newGameBtn: {
    backgroundColor: COLORS.surfaceAlt,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  newGameText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '600',
  },
});
