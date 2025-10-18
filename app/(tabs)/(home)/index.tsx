
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Platform,
  Alert,
  Animated
} from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SecurityDashboard() {
  const [protectionEnabled, setProtectionEnabled] = useState(true);
  const [antivirusEnabled, setAntivirusEnabled] = useState(true);
  const [callBlockEnabled, setCallBlockEnabled] = useState(true);
  const [screenProtectionEnabled, setScreenProtectionEnabled] = useState(true);
  const [lastScanTime, setLastScanTime] = useState('Never');
  const [threatsBlocked, setThreatsBlocked] = useState(0);
  const [callsBlocked, setCallsBlocked] = useState(0);
  const pulseAnim = new Animated.Value(1);

  useEffect(() => {
    if (protectionEnabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [protectionEnabled]);

  const handleQuickScan = () => {
    Alert.alert('Quick Scan', 'Starting quick security scan...', [
      {
        text: 'OK',
        onPress: () => {
          console.log('Quick scan initiated');
          setTimeout(() => {
            setLastScanTime(new Date().toLocaleTimeString());
            Alert.alert('Scan Complete', 'No threats detected. Your device is secure.');
          }, 2000);
        },
      },
    ]);
  };

  const handleFullScan = () => {
    Alert.alert('Full Scan', 'Starting comprehensive system scan...', [
      {
        text: 'OK',
        onPress: () => {
          console.log('Full scan initiated');
          setTimeout(() => {
            setLastScanTime(new Date().toLocaleTimeString());
            Alert.alert('Scan Complete', 'Full system scan completed. No threats found.');
          }, 3000);
        },
      },
    ]);
  };

  const handleUpdateProtection = () => {
    Alert.alert('Update Protection', 'Checking for security updates...', [
      {
        text: 'OK',
        onPress: () => {
          console.log('Checking for updates');
          setTimeout(() => {
            Alert.alert('Up to Date', 'Your protection features are up to date with the latest security definitions.');
          }, 1500);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'Security Dashboard',
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
        {/* Status Card */}
        <View style={[commonStyles.card, styles.statusCard]}>
          <View style={styles.statusHeader}>
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <View style={[
                styles.statusIcon,
                { backgroundColor: protectionEnabled ? colors.success : colors.danger }
              ]}>
                <IconSymbol 
                  name={protectionEnabled ? 'checkmark.shield.fill' : 'xmark.shield.fill'} 
                  size={40} 
                  color="#FFFFFF" 
                />
              </View>
            </Animated.View>
            <View style={styles.statusTextContainer}>
              <Text style={styles.statusTitle}>
                {protectionEnabled ? 'Protected' : 'Unprotected'}
              </Text>
              <Text style={styles.statusSubtitle}>
                {protectionEnabled 
                  ? 'Your device is fully secured' 
                  : 'Enable protection to secure your device'}
              </Text>
            </View>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <View style={[commonStyles.card, styles.statCard]}>
            <IconSymbol name="shield.checkered" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>{threatsBlocked}</Text>
            <Text style={styles.statLabel}>Threats Blocked</Text>
          </View>
          <View style={[commonStyles.card, styles.statCard]}>
            <IconSymbol name="phone.down.fill" size={24} color={colors.danger} />
            <Text style={styles.statNumber}>{callsBlocked}</Text>
            <Text style={styles.statLabel}>Calls Blocked</Text>
          </View>
        </View>

        {/* Protection Features */}
        <View style={commonStyles.card}>
          <Text style={styles.sectionTitle}>Protection Features</Text>
          
          <View style={styles.featureItem}>
            <View style={styles.featureLeft}>
              <IconSymbol name="shield.fill" size={24} color={colors.primary} />
              <View style={styles.featureText}>
                <Text style={styles.featureName}>Anti-Hack Protection</Text>
                <Text style={styles.featureDescription}>
                  Block unauthorized internet access
                </Text>
              </View>
            </View>
            <Switch
              value={protectionEnabled}
              onValueChange={setProtectionEnabled}
              trackColor={{ false: colors.textSecondary, true: colors.success }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureLeft}>
              <IconSymbol name="ant.fill" size={24} color={colors.danger} />
              <View style={styles.featureText}>
                <Text style={styles.featureName}>Antivirus Scanner</Text>
                <Text style={styles.featureDescription}>
                  Detect and remove malware
                </Text>
              </View>
            </View>
            <Switch
              value={antivirusEnabled}
              onValueChange={setAntivirusEnabled}
              trackColor={{ false: colors.textSecondary, true: colors.success }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureLeft}>
              <IconSymbol name="phone.down.fill" size={24} color={colors.warning} />
              <View style={styles.featureText}>
                <Text style={styles.featureName}>Auto Call Blocker</Text>
                <Text style={styles.featureDescription}>
                  Block all incoming calls
                </Text>
              </View>
            </View>
            <Switch
              value={callBlockEnabled}
              onValueChange={setCallBlockEnabled}
              trackColor={{ false: colors.textSecondary, true: colors.success }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureLeft}>
              <IconSymbol name="eye.slash.fill" size={24} color={colors.info} />
              <View style={styles.featureText}>
                <Text style={styles.featureName}>Screen Protection</Text>
                <Text style={styles.featureDescription}>
                  Prevent remote screen viewing
                </Text>
              </View>
            </View>
            <Switch
              value={screenProtectionEnabled}
              onValueChange={setScreenProtectionEnabled}
              trackColor={{ false: colors.textSecondary, true: colors.success }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Scan Actions */}
        <View style={commonStyles.card}>
          <Text style={styles.sectionTitle}>Security Scans</Text>
          <Text style={styles.lastScanText}>Last scan: {lastScanTime}</Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={handleQuickScan}
          >
            <IconSymbol name="bolt.fill" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Quick Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.accent }]}
            onPress={handleFullScan}
          >
            <IconSymbol name="magnifyingglass" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Full System Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.warning }]}
            onPress={handleUpdateProtection}
          >
            <IconSymbol name="arrow.clockwise" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Update Protection</Text>
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={[commonStyles.card, styles.infoCard]}>
          <IconSymbol name="info.circle.fill" size={24} color={colors.info} />
          <Text style={styles.infoText}>
            This app provides comprehensive security features to protect your device from unauthorized access, 
            malware, and privacy threats. Enable all features for maximum protection.
          </Text>
        </View>
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
  statusCard: {
    backgroundColor: colors.card,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statusSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
    paddingVertical: 20,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  featureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    marginLeft: 12,
    flex: 1,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  lastScanText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
});
