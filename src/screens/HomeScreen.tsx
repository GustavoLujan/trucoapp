import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const POINTS_KEY = 'trucoMatchPoints';
const MODE_KEY = 'trucoGameMode';

function Palillo({ rotation, top, left }: { rotation: number; top: number; left: number }) {
  return (
    <View style={[styles.palilloContainer, { top, left }]}>
      <View style={[styles.palillo, { transform: [{ rotate: `${rotation}deg` }] }]} />
    </View>
  );
}

function GrupoPalillos({ count }: { count: number }) {
  return (
    <View style={styles.grupoContainer}>
      {count >= 1 && <Palillo rotation={90} top={-30} left={32} />}
      {count >= 2 && <Palillo rotation={180} top={0} left={65} />}
      {count >= 3 && <Palillo rotation={270} top={32} left={32} />}
      {count >= 4 && <Palillo rotation={0} top={0} left={0} />}
      {count >= 5 && <Palillo rotation={45} top={0} left={34} />}
    </View>
  );
}

export function HomeScreen() {
  const [points, setPoints] = useState({ we: 0, they: 0 });
  const [winningPoints, setWinningPoints] = useState(30);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winner, setWinner] = useState('');
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedPoints = await AsyncStorage.getItem(POINTS_KEY);
      if (storedPoints) {
        setPoints(JSON.parse(storedPoints));
      }
      
      const storedMode = await AsyncStorage.getItem(MODE_KEY);
      if (storedMode) {
        setWinningPoints(JSON.parse(storedMode));
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const savePoints = async (newPoints: { we: number; they: number }) => {
    try {
      await AsyncStorage.setItem(POINTS_KEY, JSON.stringify(newPoints));
    } catch (error) {
      console.log('Error saving points:', error);
    }
  };

  const saveMode = async (mode: number) => {
    try {
      await AsyncStorage.setItem(MODE_KEY, JSON.stringify(mode));
    } catch (error) {
      console.log('Error saving mode:', error);
    }
  };

  const handlePointsChange = (team: 'we' | 'they', delta: number) => {
    const newPoints = { ...points };
    if (team === 'we') {
      newPoints.we = Math.max(0, Math.min(winningPoints, points.we + delta));
    } else {
      newPoints.they = Math.max(0, Math.min(winningPoints, points.they + delta));
    }
    
    setPoints(newPoints);
    savePoints(newPoints);

    if (newPoints.we === winningPoints) {
      setWinner('nosotros');
      setShowWinnerModal(true);
    } else if (newPoints.they === winningPoints) {
      setWinner('ellos');
      setShowWinnerModal(true);
    }
  };

  const handleRestart = () => {
    setPoints({ we: 0, they: 0 });
    savePoints({ we: 0, they: 0 });
    setShowRestartModal(false);
    setShowWinnerModal(false);
  };

  const openRestartModal = () => {
    setShowRestartModal(true);
  };

  const openModeModal = () => {
    setShowModeModal(true);
  };

  const selectMode = (mode: number) => {
    setWinningPoints(mode);
    saveMode(mode);
    setPoints({ we: 0, they: 0 });
    savePoints({ we: 0, they: 0 });
    setShowModeModal(false);
  };

  const renderPalillos = (count: number) => {
    const grupos = [];
    const numGruposCompletos = Math.floor(count / 5);
    const puntosParcial = count % 5;

    for (let i = 0; i < numGruposCompletos; i++) {
      grupos.push(
        <View key={`completo-${i}`} style={styles.grupoWrapper}>
          <GrupoPalillos count={5} />
        </View>
      );
    }

    if (puntosParcial > 0) {
      grupos.push(
        <View key="parcial" style={styles.grupoWrapper}>
          <GrupoPalillos count={puntosParcial} />
        </View>
      );
    }

    return grupos;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Anotador Truco</Text>
          <TouchableOpacity style={styles.modeButton} onPress={openModeModal}>
            <Text style={styles.modeButtonText}>⚙️</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Primera a {winningPoints}</Text>
      </View>

      <View style={styles.gameContainer}>
        <View style={styles.boardContainer}>
          <View style={styles.boardHeader}>
            <Text style={styles.boardTitle}>NOSOTROS</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsBadgeText}>({points.we})</Text>
            </View>
          </View>
          
          <View style={styles.boardContent}>
            <ScrollView contentContainerStyle={styles.palillosScroll}>
              {renderPalillos(points.we)}
            </ScrollView>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.sacarButton]}
              onPress={() => handlePointsChange('we', -1)}
            >
              <Text style={styles.buttonText}>Sacar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.agregarButton]}
              onPress={() => handlePointsChange('we', 1)}
            >
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.boardContainer}>
          <View style={styles.boardHeader}>
            <Text style={styles.boardTitle}>ELLOS</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsBadgeText}>({points.they})</Text>
            </View>
          </View>
          
          <View style={styles.boardContent}>
            <ScrollView contentContainerStyle={styles.palillosScroll}>
              {renderPalillos(points.they)}
            </ScrollView>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.sacarButton]}
              onPress={() => handlePointsChange('they', -1)}
            >
              <Text style={styles.buttonText}>Sacar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.agregarButton]}
              onPress={() => handlePointsChange('they', 1)}
            >
              <Text style={styles.buttonText}>Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.restartButton} onPress={openRestartModal}>
        <Text style={styles.restartButtonText}>Reiniciar</Text>
      </TouchableOpacity>

      {showWinnerModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {winner === 'nosotros' ? '¡Nosotros ganamos!' : '¡Ellos ganaron!'}
            </Text>
            <Text style={styles.modalSubtitle}>el partido</Text>
            <Text style={styles.modalEmoji}>🙂</Text>
            <Text style={styles.modalQuestion}>¿Jugamos de nuevo?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleRestart}>
                <Text style={styles.modalButtonText}>Si</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonNo} onPress={() => setShowWinnerModal(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {showRestartModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Reiniciar el juego</Text>
            <Text style={styles.modalEmoji}>🚨</Text>
            <Text style={styles.modalQuestion}>¿Estás seguro?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleRestart}>
                <Text style={styles.modalButtonText}>Si</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonNo} onPress={() => setShowRestartModal(false)}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Modal visible={showModeModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Modo de Juego</Text>
            <Text style={styles.modalSubtitle}>¿A cuántos puntos jugamos?</Text>
            <View style={styles.modeButtons}>
              <TouchableOpacity 
                style={[styles.modeOption, winningPoints === 15 && styles.modeOptionSelected]} 
                onPress={() => selectMode(15)}
              >
                <Text style={[styles.modeOptionText, winningPoints === 15 && styles.modeOptionTextSelected]}>15</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modeOption, winningPoints === 30 && styles.modeOptionSelected]} 
                onPress={() => selectMode(30)}
              >
                <Text style={[styles.modeOptionText, winningPoints === 30 && styles.modeOptionTextSelected]}>30</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowModeModal(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  modeButton: {
    padding: 4,
  },
  modeButtonText: {
    fontSize: 24,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  gameContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    gap: 8,
  },
  boardContainer: {
    flex: 1,
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 12,
  },
  boardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  boardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f8fafc',
  },
  pointsBadge: {
    backgroundColor: '#475569',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pointsBadgeText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  boardContent: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 8,
  },
  palillosScroll: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  grupoWrapper: {
    margin: 10,
  },
  grupoContainer: {
    width: 70,
    height: 70,
    position: 'relative',
  },
  palilloContainer: {
    position: 'absolute',
  },
  palillo: {
    width: 6,
    height: 50,
    backgroundColor: '#fbbf24',
    borderRadius: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  agregarButton: {
    backgroundColor: '#22c55e',
  },
  sacarButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  restartButton: {
    margin: 16,
    padding: 14,
    backgroundColor: '#475569',
    borderRadius: 8,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#f8fafc',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f8fafc',
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
    textAlign: 'center',
  },
  modalEmoji: {
    fontSize: 48,
    marginVertical: 16,
  },
  modalQuestion: {
    fontSize: 18,
    color: '#f8fafc',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonNo: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modeButtons: {
    flexDirection: 'row',
    gap: 16,
    marginVertical: 20,
  },
  modeOption: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeOptionSelected: {
    backgroundColor: '#3b82f6',
  },
  modeOptionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  modeOptionTextSelected: {
    color: '#ffffff',
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  closeButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
