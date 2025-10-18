
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  Modal,
} from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  locked: boolean;
  selected: boolean;
}

export default function FileManager() {
  const [files, setFiles] = useState<FileItem[]>([
    { id: '1', name: 'Documents', type: 'folder', locked: false, selected: false },
    { id: '2', name: 'Photos', type: 'folder', locked: true, selected: false },
    { id: '3', name: 'Downloads', type: 'folder', locked: false, selected: false },
    { id: '4', name: 'Important.pdf', type: 'file', size: '2.5 MB', locked: true, selected: false },
    { id: '5', name: 'Notes.txt', type: 'file', size: '45 KB', locked: false, selected: false },
    { id: '6', name: 'Video.mp4', type: 'file', size: '125 MB', locked: false, selected: false },
  ]);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState('');
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectionMode, setSelectionMode] = useState(false);

  const handleLockToggle = (fileId: string, currentLockState: boolean) => {
    if (currentLockState) {
      setSelectedFileId(fileId);
      setShowPinModal(true);
    } else {
      setSelectedFileId(fileId);
      setShowPinModal(true);
    }
  };

  const handlePinSubmit = () => {
    if (pin.length === 4) {
      const updatedFiles = files.map(file =>
        file.id === selectedFileId ? { ...file, locked: !file.locked } : file
      );
      setFiles(updatedFiles);
      setShowPinModal(false);
      setPin('');
      setSelectedFileId(null);
      Alert.alert('Success', 'File lock status updated');
    } else {
      Alert.alert('Error', 'Please enter a 4-digit PIN');
    }
  };

  const handleFileSelect = (fileId: string) => {
    if (selectionMode) {
      const updatedFiles = files.map(file =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      );
      setFiles(updatedFiles);
    }
  };

  const handleDeleteSelected = () => {
    const selectedFiles = files.filter(f => f.selected);
    if (selectedFiles.length === 0) {
      Alert.alert('No Selection', 'Please select files to delete');
      return;
    }

    Alert.alert(
      'Total Deletion',
      `Are you sure you want to permanently delete ${selectedFiles.length} item(s)? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedFiles = files.filter(f => !f.selected);
            setFiles(updatedFiles);
            setSelectionMode(false);
            Alert.alert('Deleted', 'Selected items have been permanently deleted');
          },
        },
      ]
    );
  };

  const handleCopyFile = (fileId: string) => {
    Alert.alert('Copy', 'File copied to clipboard');
    console.log('Copying file:', fileId);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'File Manager',
            headerLargeTitle: true,
          }}
        />
      )}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          Platform.OS !== 'ios' && styles.scrollContentWithTabBar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Actions */}
        <View style={commonStyles.card}>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.headerButton, selectionMode && styles.headerButtonActive]}
              onPress={() => {
                setSelectionMode(!selectionMode);
                if (selectionMode) {
                  const updatedFiles = files.map(f => ({ ...f, selected: false }));
                  setFiles(updatedFiles);
                }
              }}
            >
              <IconSymbol
                name={selectionMode ? 'checkmark.circle.fill' : 'checkmark.circle'}
                size={20}
                color={selectionMode ? colors.primary : colors.text}
              />
              <Text style={[styles.headerButtonText, selectionMode && styles.headerButtonTextActive]}>
                {selectionMode ? 'Cancel' : 'Select'}
              </Text>
            </TouchableOpacity>

            {selectionMode && (
              <TouchableOpacity
                style={[styles.headerButton, { backgroundColor: colors.danger }]}
                onPress={handleDeleteSelected}
              >
                <IconSymbol name="trash.fill" size={20} color="#FFFFFF" />
                <Text style={[styles.headerButtonText, { color: '#FFFFFF' }]}>
                  Delete Selected
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Files List */}
        <View style={commonStyles.card}>
          <Text style={styles.sectionTitle}>Files & Folders</Text>
          {files.map((file) => (
            <TouchableOpacity
              key={file.id}
              style={[styles.fileItem, file.selected && styles.fileItemSelected]}
              onPress={() => handleFileSelect(file.id)}
            >
              <View style={styles.fileLeft}>
                {selectionMode && (
                  <View style={styles.checkbox}>
                    {file.selected && (
                      <IconSymbol name="checkmark" size={16} color={colors.primary} />
                    )}
                  </View>
                )}
                <IconSymbol
                  name={file.type === 'folder' ? 'folder.fill' : 'doc.fill'}
                  size={32}
                  color={file.type === 'folder' ? colors.warning : colors.primary}
                />
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  {file.size && <Text style={styles.fileSize}>{file.size}</Text>}
                </View>
              </View>
              <View style={styles.fileActions}>
                {file.locked && (
                  <IconSymbol name="lock.fill" size={20} color={colors.danger} />
                )}
                {!selectionMode && (
                  <>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleLockToggle(file.id, file.locked)}
                    >
                      <IconSymbol
                        name={file.locked ? 'lock.fill' : 'lock.open.fill'}
                        size={20}
                        color={file.locked ? colors.danger : colors.success}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleCopyFile(file.id)}
                    >
                      <IconSymbol name="doc.on.doc" size={20} color={colors.primary} />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info */}
        <View style={[commonStyles.card, styles.infoCard]}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
          <Text style={styles.infoText}>
            Use the lock feature to protect sensitive files with a PIN. 
            Select multiple files for total deletion. Locked files require PIN to access.
          </Text>
        </View>
      </ScrollView>

      {/* PIN Modal */}
      <Modal
        visible={showPinModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPinModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter 4-Digit PIN</Text>
            <TextInput
              style={styles.pinInput}
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              placeholder="****"
              placeholderTextColor={colors.textSecondary}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.secondary }]}
                onPress={() => {
                  setShowPinModal(false);
                  setPin('');
                  setSelectedFileId(null);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.primary }]}
                onPress={handlePinSubmit}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 20,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
  },
  headerButtonActive: {
    backgroundColor: colors.primary,
  },
  headerButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  headerButtonTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  fileItemSelected: {
    backgroundColor: '#E3F2FD',
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primary,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  fileSize: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  fileActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E3F2FD',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  pinInput: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 8,
    color: colors.text,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
