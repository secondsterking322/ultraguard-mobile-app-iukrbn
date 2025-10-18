
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

interface CloudFile {
  id: string;
  name: string;
  size: string;
  encrypted: boolean;
  uploadDate: string;
}

export default function CloudStorage() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [cloudFiles, setCloudFiles] = useState<CloudFile[]>([
    { id: '1', name: 'Backup_2024.zip', size: '450 MB', encrypted: true, uploadDate: '2024-01-15' },
    { id: '2', name: 'Personal_Photos.zip', size: '2.1 GB', encrypted: true, uploadDate: '2024-01-10' },
    { id: '3', name: 'Documents.pdf', size: '15 MB', encrypted: false, uploadDate: '2024-01-05' },
  ]);
  const [storageUsed] = useState(2.565); // GB
  const [storageTotal] = useState(1000); // 1TB = 1000GB

  const handleUnlock = () => {
    if (pin === '1234' || pin.length === 4) {
      setIsUnlocked(true);
      setShowPinModal(false);
      setPin('');
      Alert.alert('Success', 'Cloud storage unlocked');
    } else {
      Alert.alert('Error', 'Invalid PIN. Please try again.');
    }
  };

  const handleEncryptFile = (fileId: string) => {
    Alert.alert(
      'Encrypt File',
      'Choose encryption method:',
      [
        {
          text: 'PIN',
          onPress: () => {
            const updatedFiles = cloudFiles.map(file =>
              file.id === fileId ? { ...file, encrypted: true } : file
            );
            setCloudFiles(updatedFiles);
            Alert.alert('Success', 'File encrypted with PIN');
          },
        },
        {
          text: 'Pattern',
          onPress: () => {
            const updatedFiles = cloudFiles.map(file =>
              file.id === fileId ? { ...file, encrypted: true } : file
            );
            setCloudFiles(updatedFiles);
            Alert.alert('Success', 'File encrypted with Pattern');
          },
        },
        {
          text: 'Password',
          onPress: () => {
            const updatedFiles = cloudFiles.map(file =>
              file.id === fileId ? { ...file, encrypted: true } : file
            );
            setCloudFiles(updatedFiles);
            Alert.alert('Success', 'File encrypted with Password');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleDecryptFile = (fileId: string) => {
    Alert.alert(
      'Decrypt File',
      'Enter your encryption key to decrypt this file',
      [
        {
          text: 'OK',
          onPress: () => {
            const updatedFiles = cloudFiles.map(file =>
              file.id === fileId ? { ...file, encrypted: false } : file
            );
            setCloudFiles(updatedFiles);
            Alert.alert('Success', 'File decrypted successfully');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleUploadFile = () => {
    Alert.alert('Upload File', 'Select a file to upload to secure cloud storage');
    console.log('Upload file initiated');
  };

  const storagePercentage = (storageUsed / storageTotal) * 100;

  if (!isUnlocked) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        {Platform.OS === 'ios' && (
          <Stack.Screen
            options={{
              title: 'Cloud Storage',
              headerLargeTitle: true,
            }}
          />
        )}
        <View style={styles.lockScreen}>
          <IconSymbol name="lock.fill" size={80} color={colors.primary} />
          <Text style={styles.lockTitle}>Cloud Storage Locked</Text>
          <Text style={styles.lockSubtitle}>
            Enter your 4-digit PIN to access secure cloud storage
          </Text>
          <TouchableOpacity
            style={styles.unlockButton}
            onPress={() => setShowPinModal(true)}
          >
            <Text style={styles.unlockButtonText}>Unlock Storage</Text>
          </TouchableOpacity>
        </View>

        <Modal
          visible={showPinModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowPinModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter PIN</Text>
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
                  }}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: colors.primary }]}
                  onPress={handleUnlock}
                >
                  <Text style={styles.modalButtonText}>Unlock</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Cloud Storage',
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
        {/* Storage Info */}
        <View style={commonStyles.card}>
          <View style={styles.storageHeader}>
            <IconSymbol name="cloud.fill" size={40} color={colors.primary} />
            <View style={styles.storageInfo}>
              <Text style={styles.storageTitle}>Secure Cloud Storage</Text>
              <Text style={styles.storageSubtitle}>
                {storageUsed.toFixed(2)} GB of {storageTotal} GB used
              </Text>
            </View>
          </View>
          <View style={styles.storageBar}>
            <View style={[styles.storageBarFill, { width: `${storagePercentage}%` }]} />
          </View>
          <Text style={styles.storagePercentage}>{storagePercentage.toFixed(2)}% used</Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity
          style={[commonStyles.card, styles.uploadCard]}
          onPress={handleUploadFile}
        >
          <IconSymbol name="arrow.up.circle.fill" size={32} color={colors.success} />
          <Text style={styles.uploadText}>Upload Files to Cloud</Text>
        </TouchableOpacity>

        {/* Files List */}
        <View style={commonStyles.card}>
          <Text style={styles.sectionTitle}>Your Files</Text>
          {cloudFiles.map((file) => (
            <View key={file.id} style={styles.fileItem}>
              <View style={styles.fileLeft}>
                <IconSymbol name="doc.fill" size={32} color={colors.primary} />
                <View style={styles.fileInfo}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <Text style={styles.fileDetails}>
                    {file.size} • {file.uploadDate}
                  </Text>
                  {file.encrypted && (
                    <View style={styles.encryptedBadge}>
                      <IconSymbol name="lock.fill" size={12} color="#FFFFFF" />
                      <Text style={styles.encryptedText}>Encrypted</Text>
                    </View>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                  file.encrypted
                    ? handleDecryptFile(file.id)
                    : handleEncryptFile(file.id)
                }
              >
                <IconSymbol
                  name={file.encrypted ? 'lock.fill' : 'lock.open.fill'}
                  size={20}
                  color={file.encrypted ? colors.danger : colors.success}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Security Info */}
        <View style={[commonStyles.card, styles.infoCard]}>
          <IconSymbol name="shield.checkered" size={24} color={colors.success} />
          <Text style={styles.infoText}>
            Your cloud storage is protected with military-grade encryption. 
            Unauthorized users cannot access or view your files. 
            Use PIN, pattern, or password encryption for additional security.
          </Text>
        </View>

        {/* Lock Button */}
        <TouchableOpacity
          style={[styles.lockButton]}
          onPress={() => {
            setIsUnlocked(false);
            Alert.alert('Locked', 'Cloud storage has been locked');
          }}
        >
          <IconSymbol name="lock.fill" size={20} color="#FFFFFF" />
          <Text style={styles.lockButtonText}>Lock Storage</Text>
        </TouchableOpacity>
      </ScrollView>
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
  lockScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  lockTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  lockSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  unlockButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  unlockButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  storageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  storageInfo: {
    marginLeft: 16,
    flex: 1,
  },
  storageTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  storageSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  storageBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  storageBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  storagePercentage: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#E8F5E9',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
    marginLeft: 12,
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
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  fileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 4,
  },
  fileDetails: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.danger,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  encryptedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  iconButton: {
    padding: 8,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E8F5E9',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
  lockButton: {
    backgroundColor: colors.danger,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  lockButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
