import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { GameMode, Team } from '../types';

interface GameConfigModalProps {
  visible: boolean;
  gameMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  onClose: () => void;
}

export function GameConfigModal({
  visible,
  gameMode,
  onSelectMode,
  onClose,
}: GameConfigModalProps) {
  const modes: GameMode[] = [15, 30, 45];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Configuración</Text>
          
          <Text style={styles.sectionTitle}>Puntos para ganar</Text>
          <View style={styles.modesContainer}>
            {modes.map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.modeButton,
                  gameMode === mode && styles.modeButtonSelected,
                ]}
                onPress={() => onSelectMode(mode)}
              >
                <Text style={[
                  styles.modeText,
                  gameMode === mode && styles.modeTextSelected,
                ]}>
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

interface WinnerModalProps {
  visible: boolean;
  winner: Team;
  onNewMatch: () => void;
  onResetAll: () => void;
}

export function WinnerModal({
  visible,
  winner,
  onNewMatch,
  onResetAll,
}: WinnerModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>¡Victoria!</Text>
          <Text style={[
            styles.winnerText,
            winner === 'A' ? styles.winnerA : styles.winnerB,
          ]}>
            Equipo {winner} ha ganado
          </Text>
          
          <View style={styles.winnerButtons}>
            <TouchableOpacity style={styles.newMatchButton} onPress={onNewMatch}>
              <Text style={styles.newMatchText}>Nueva Partido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetAllButton} onPress={onResetAll}>
              <Text style={styles.resetAllText}>Reiniciar Todo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  modesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  modeButton: {
    backgroundColor: '#374151',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  modeButtonSelected: {
    backgroundColor: '#3B82F6',
  },
  modeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9CA3AF',
  },
  modeTextSelected: {
    color: '#FFFFFF',
  },
  closeButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  winnerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  winnerA: {
    color: '#3B82F6',
  },
  winnerB: {
    color: '#EF4444',
  },
  winnerButtons: {
    width: '100%',
    gap: 12,
  },
  newMatchButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  newMatchText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  resetAllButton: {
    backgroundColor: '#374151',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  resetAllText: {
    color: '#9CA3AF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
