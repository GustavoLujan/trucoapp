import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { GameModeSelector } from '../components/GameModeSelector';
import { Header } from '../components/Header';
import { ScoreControls } from '../components/ScoreControls';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { WinnerModal } from '../components/WinnerModal';
import { COLORS } from '../constants/game';
import { useGameState } from '../hooks/useGameState';

export function GameScreen() {
  const { state, winningScore, addPoints, subtractOne, setMode, newGame, canChangeMode } =
    useGameState();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <Header onNewGame={newGame} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.modeRow}>
          <GameModeSelector mode={state.mode} onChange={setMode} disabled={!canChangeMode} />
        </View>
        <ScoreDisplay state={state} winningScore={winningScore} />
        <View style={styles.controlsRow}>
          <ScoreControls
            onAdd={addPoints}
            onSubtract={subtractOne}
            disabled={state.status === 'won'}
          />
        </View>
      </ScrollView>
      <WinnerModal
        visible={state.status === 'won'}
        winner={state.winner}
        nosotrosScore={state.nosotros.score}
        ellosScore={state.ellos.score}
        onNewGame={newGame}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    paddingVertical: 16,
    gap: 20,
  },
  modeRow: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  controlsRow: {
    paddingBottom: 24,
  },
});
