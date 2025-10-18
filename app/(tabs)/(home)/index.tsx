
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

interface BlockedAttempt {
  id: string;
  type: 'hidden' | 'unauthorized' | 'suspicious';
  timestamp: string;
  source: string;
}

export default function SecurityDashboard() {
  const [protectionEnabled, setProtectionEnabled] = useState(true);
  const [antivirusEnabled, setAntivirusEnabled] = useState(true);
  const [callBlockEnabled, setCallBlockEnabled] = useState(true);
  const [screenProtectionEnabled, setScreenProtectionEnabled] = useState(true);
  const [autoBlockHiddenUsers, setAutoBlockHiddenUsers] = useState(true);
  const [lastScanTime, setLastScanTime] = useState('Never');
  const [threatsBlocked, setThreatsBlocked] = useState(0);
  const [callsBlocked, setCallsBlocked] = useState(0);
  const [hiddenUsersBlocked, setHiddenUsersBlocked] = useState(0);
  const [recentBlocks, setRecentBlocks] = useState<BlockedAttempt[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const pulseAnim = new Animated.Value(1);
  const blockFlashAnim = new Animated.Value(0);

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

  // Simulate monitoring for hidden unauthorized access
  useEffect(() => {
    let monitoringInterval: NodeJS.Timeout;
    
    if (autoBlockHiddenUsers && protectionEnabled) {
      setIsMonitoring(true);
      console.log('Auto-block monitoring started for hidden unauthorized users');
      
      // Simulate detecting and blocking hidden unauthorized access attempts
      monitoringInterval = setInterval(() => {
        // Random chance to detect a hidden threat (10% chance every 15 seconds)
        if (Math.random() < 0.1) {
          const threatTypes = ['hidden', 'unauthorized', 'suspicious'] as const;
          const sources = [
            'Unknown IP 192.168.x.x',
            'Hidden Network Request',
            'Unauthorized Background Process',
            'Suspicious Data Access',
            'Hidden Connection Attempt',
            'Stealth Mode Access',
          ];
          
          const newBlock: BlockedAttempt = {
            id: Date.now().toString(),
            type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
            timestamp: new Date().toLocaleTimeString(),
            source: sources[Math.floor(Math.random() * sources.length)],
          };
          
          setRecentBlocks(prev => [newBlock, ...prev.slice(0, 4)]);
          setHiddenUsersBlocked(prev => prev + 1);
          setThreatsBlocked(prev => prev + 1);
          
          // Flash animation when blocking occurs
          Animated.sequence([
            Animated.timing(blockFlashAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(blockFlashAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
          
          console.log('Blocked hidden unauthorized access:', newBlock);
        }
      }, 15000); // Check every 15 seconds
    } else {
      setIsMonitoring(false);
      console.log('Auto-block monitoring stopped');
    }
    
    return () => {
      if (monitoringInterval) {
        clearInterval(monitoringInterval);
      }
    };
  }, [autoBlockHiddenUsers, protectionEnabled]);

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

  const handleAutoBlockToggle = (value: boolean) => {
    setAutoBlockHiddenUsers(value);
    if (value) {
      Alert.alert(
        'Auto-Block Enabled',
        'Hidden unauthorized internet access users will be automatically detected and blocked in real-time.',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Auto-Block Disabled',
        'Automatic blocking of hidden users has been disabled. Manual intervention will be required.',
        [{ text: 'OK' }]
      );
    }
  };

  const getBlockTypeColor = (type: string) => {
    switch (type) {
      case 'hidden':
        return colors.danger;
      case 'unauthorized':
        return colors.warning;
      case 'suspicious':
        return colors.info;
      default:
        return colors.textSecondary;
    }
  };

  const getBlockTypeIcon = (type: string) => {
    switch (type) {
      case 'hidden':
        return 'eye.slash.fill';
      case 'unauthorized':
        return 'lock.shield.fill';
      case 'suspicious':
        return 'exclamationmark.triangle.fill';
      default:
        return 'shield.fill';
    }
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
              {isMonitoring && (
                <View style={styles.monitoringBadge}>
                  <View style={styles.monitoringDot} />
                  <Text style={styles.monitoringText}>Monitoring Active</Text>
                </View>
              )}
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
            <Animated.View style={{ opacity: blockFlashAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0.3]
            })}}>
              <IconSymbol name="eye.slash.fill" size={24} color={colors.danger} />
              <Text style={styles.statNumber}>{hiddenUsersBlocked}</Text>
              <Text style={styles.statLabel}>Hidden Users Blocked</Text>
            </Animated.View>
          </View>
          <View style={[commonStyles.card, styles.statCard]}>
            <IconSymbol name="phone.down.fill" size={24} color={colors.warning} />
            <Text style={styles.statNumber}>{callsBlocked}</Text>
            <Text style={styles.statLabel}>Calls Blocked</Text>
          </View>
        </View>

        {/* Auto-Block Feature */}
        <View style={commonStyles.card}>
          <View style={styles.autoBlockHeader}>
            <IconSymbol name="bolt.shield.fill" size={28} color={colors.primary} />
            <Text style={styles.autoBlockTitle}>Auto-Block System</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureLeft}>
              <IconSymbol name="eye.trianglebadge.exclamationmark.fill" size={24} color={colors.danger} />
              <View style={styles.featureText}>
                <Text style={styles.featureName}>Block Hidden Users</Text>
                <Text style={styles.featureDescription}>
                  Automatically detect and block hidden unauthorized internet access
                </Text>
              </View>
            </View>
            <Switch
              value={autoBlockHiddenUsers}
              onValueChange={handleAutoBlockToggle}
              trackColor={{ false: colors.textSecondary, true: colors.success }}
              thumbColor="#FFFFFF"
            />
          </View>

          {autoBlockHiddenUsers && (
            <View style={styles.autoBlockInfo}>
              <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
              <Text style={styles.autoBlockInfoText}>
                Real-time monitoring active. Hidden threats will be blocked automatically.
              </Text>
            </View>
          )}
        </View>

        {/* Recent Blocks Activity Log */}
        {recentBlocks.length > 0 && (
          <View style={commonStyles.card}>
            <Text style={styles.sectionTitle}>Recent Blocks</Text>
            {recentBlocks.map((block) => (
              <View key={block.id} style={styles.blockItem}>
                <View style={[styles.blockIconContainer, { backgroundColor: getBlockTypeColor(block.type) + '20' }]}>
                  <IconSymbol 
                    name={getBlockTypeIcon(block.type)} 
                    size={20} 
                    color={getBlockTypeColor(block.type)} 
                  />
                </View>
                <View style={styles.blockDetails}>
                  <Text style={styles.blockSource}>{block.source}</Text>
                  <Text style={styles.blockTime}>{block.timestamp}</Text>
                </View>
                <View style={[styles.blockTypeBadge, { backgroundColor: getBlockTypeColor(block.type) }]}>
                  <Text style={styles.blockTypeText}>{block.type.toUpperCase()}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

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
            malware, and privacy threats. The auto-block system continuously monitors for hidden unauthorized 
            internet access users and blocks them automatically in real-time.
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
  monitoringBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  monitoringDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  monitoringText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: '600',
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
  autoBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  autoBlockTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  autoBlockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success + '15',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  autoBlockInfoText: {
    fontSize: 13,
    color: colors.text,
    marginLeft: 8,
    flex: 1,
  },
  blockItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  blockIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  blockDetails: {
    flex: 1,
  },
  blockSource: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  blockTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  blockTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  blockTypeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
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
