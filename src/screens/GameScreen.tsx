import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { GameModeSelector } from '../components/GameModeSelector';
import { Header } from '../components/Header';
import { ScoreDisplay } from '../components/ScoreDisplay';
import { WinnerModal } from '../components/WinnerModal';
import { COLORS } from '../constants/game';
import { useGameState } from '../hooks/useGameState';
import type { TeamId } from '../types/game';

export function GameScreen() {
  const { state, winningScore, addPoints, subtractOne, setMode, newGame, canChangeMode, teamNames, setTeamName } =
    useGameState();

  const [editingTeam, setEditingTeam] = useState<TeamId | null>(null);
  const [draftName, setDraftName] = useState('');

  const openEdit = useCallback((team: TeamId) => {
    setDraftName(teamNames[team]);
    setEditingTeam(team);
  }, [teamNames]);

  const confirmEdit = useCallback(() => {
    if (editingTeam && draftName.trim()) {
      setTeamName(editingTeam, draftName.trim());
    }
    setEditingTeam(null);
  }, [editingTeam, draftName, setTeamName]);

  const cancelEdit = useCallback(() => setEditingTeam(null), []);

  const winnerLabel = state.winner ? teamNames[state.winner] : '';

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <Header onNewGame={newGame} />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.modeRow}>
          <GameModeSelector mode={state.mode} onChange={setMode} disabled={!canChangeMode} />
        </View>
        <ScoreDisplay
          nosotros={{ ...state.nosotros, label: teamNames.nosotros }}
          ellos={{ ...state.ellos, label: teamNames.ellos }}
          winningScore={winningScore}
          winner={state.winner}
          status={state.status}
          onAdd={addPoints}
          onSubtract={subtractOne}
          onEditName={openEdit}
        />
      </ScrollView>
      <WinnerModal
        visible={state.status === 'won'}
        winner={state.winner}
        winnerLabel={winnerLabel}
        nosotrosScore={state.nosotros.score}
        ellosScore={state.ellos.score}
        onNewGame={newGame}
      />
      <Modal visible={editingTeam !== null} transparent animationType="fade">
        <View style={styles.editOverlay}>
          <View style={styles.editCard}>
            <Text style={styles.editTitle}>Nombre del equipo</Text>
            <TextInput
              style={styles.editInput}
              value={draftName}
              onChangeText={setDraftName}
              autoFocus
              selectTextOnFocus
              maxLength={20}
              placeholderTextColor="#666"
              onSubmitEditing={confirmEdit}
            />
            <View style={styles.editButtons}>
              <Pressable style={styles.editCancel} onPress={cancelEdit}>
                <Text style={styles.editCancelText}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.editConfirm} onPress={confirmEdit}>
                <Text style={styles.editConfirmText}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    paddingVertical: 14,
    gap: 16,
  },
  modeRow: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  editOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 28,
    width: '80%',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },
  editTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  editInput: {
    backgroundColor: '#2a2a2a',
    color: COLORS.text,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: COLORS.border,
    textAlign: 'center',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
  },
  editCancelText: {
    color: COLORS.textMuted,
    fontSize: 15,
    fontWeight: '600',
  },
  editConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
  },
  editConfirmText: {
    color: COLORS.bg,
    fontSize: 15,
    fontWeight: '800',
  },
});
