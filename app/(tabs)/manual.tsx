
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Manual() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: 'User Manual',
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
        {/* Introduction */}
        <View style={commonStyles.card}>
          <View style={styles.headerSection}>
            <IconSymbol name="shield.checkered" size={48} color={colors.primary} />
            <Text style={styles.appTitle}>Anti-Hack Security Pro</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>
        </View>

        {/* Features Overview */}
        <View style={commonStyles.card}>
          <Text style={styles.sectionTitle}>Features Overview</Text>
          <Text style={styles.paragraph}>
            This comprehensive security application provides ultra-powerful protection for your Android device 
            with advanced features to safeguard your privacy and data.
          </Text>
        </View>

        {/* Security Dashboard */}
        <View style={commonStyles.card}>
          <View style={styles.featureHeader}>
            <IconSymbol name="shield.fill" size={24} color={colors.primary} />
            <Text style={styles.featureTitle}>Security Dashboard</Text>
          </View>
          <Text style={styles.paragraph}>
            The main security hub displays your device&apos;s protection status in real-time.
          </Text>
          <Text style={styles.subheading}>Key Features:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Anti-Hack Protection:</Text> Blocks unauthorized internet access 
              and prevents remote intrusions. Runs continuously in the background.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Antivirus Scanner:</Text> Detects and removes viruses, malware, 
              and suspicious apps. Includes quick scan and full system scan options.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Auto Call Blocker:</Text> Automatically blocks all incoming calls 
              to prevent unauthorized contact.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Screen Protection:</Text> Prevents unauthorized users from viewing 
              your screen remotely through their devices.
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Automatic Updates:</Text> Regular security updates strengthen 
              protection and detect new malware threats.
            </Text>
          </View>
        </View>

        {/* File Manager */}
        <View style={commonStyles.card}>
          <View style={styles.featureHeader}>
            <IconSymbol name="folder.fill" size={24} color={colors.warning} />
            <Text style={styles.featureTitle}>File Manager</Text>
          </View>
          <Text style={styles.paragraph}>
            Comprehensive file management with advanced security features.
          </Text>
          <Text style={styles.subheading}>Capabilities:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              View, copy, and manage all files and folders on your device
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Lock files and folders with PIN, pattern, or password protection
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Total deletion feature for permanent file removal
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Select multiple files for batch operations
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Prevents unauthorized deletion by internet users
            </Text>
          </View>
        </View>

        {/* Cloud Storage */}
        <View style={commonStyles.card}>
          <View style={styles.featureHeader}>
            <IconSymbol name="cloud.fill" size={24} color={colors.info} />
            <Text style={styles.featureTitle}>Secure Cloud Storage</Text>
          </View>
          <Text style={styles.paragraph}>
            1TB of encrypted cloud storage with military-grade security.
          </Text>
          <Text style={styles.subheading}>Features:</Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>1TB Storage:</Text> Massive storage capacity for all your files
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>4-Digit PIN Access:</Text> Required to unlock and access cloud storage
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Encryption Options:</Text> Encrypt files with PIN, pattern, or password
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Unauthorized Access Prevention:</Text> Blocks internet users from 
              viewing or accessing your cloud files
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Upload and download files securely over WiFi or mobile data
            </Text>
          </View>
        </View>

        {/* Permissions */}
        <View style={commonStyles.card}>
          <View style={styles.featureHeader}>
            <IconSymbol name="checkmark.shield.fill" size={24} color={colors.success} />
            <Text style={styles.featureTitle}>Required Permissions</Text>
          </View>
          <Text style={styles.paragraph}>
            This app requires the following permissions to provide full protection:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Storage Access:</Text> To scan and protect files
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Network Access:</Text> To monitor and block unauthorized connections
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Phone Access:</Text> To block unwanted calls
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Background Running:</Text> To provide continuous protection
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Notification Access:</Text> To alert you of security threats
            </Text>
          </View>
        </View>

        {/* How to Use */}
        <View style={commonStyles.card}>
          <View style={styles.featureHeader}>
            <IconSymbol name="questionmark.circle.fill" size={24} color={colors.highlight} />
            <Text style={styles.featureTitle}>How to Use</Text>
          </View>
          
          <Text style={styles.subheading}>Getting Started:</Text>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Enable all protection features on the Security Dashboard
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Run a full system scan to detect any existing threats
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Set up cloud storage with a secure 4-digit PIN
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>
              Lock sensitive files and folders in File Manager
            </Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <Text style={styles.stepText}>
              Keep the app running in the background for continuous protection
            </Text>
          </View>
        </View>

        {/* Security Tips */}
        <View style={commonStyles.card}>
          <View style={styles.featureHeader}>
            <IconSymbol name="lightbulb.fill" size={24} color={colors.highlight} />
            <Text style={styles.featureTitle}>Security Tips</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Use strong, unique PINs and passwords for maximum security
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Run regular security scans to detect new threats
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Keep protection features enabled at all times
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Update the app regularly to get the latest security features
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Encrypt sensitive files before uploading to cloud storage
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              Never share your security PINs or passwords with anyone
            </Text>
          </View>
        </View>

        {/* Advanced Protection */}
        <View style={commonStyles.card}>
          <View style={styles.featureHeader}>
            <IconSymbol name="lock.shield.fill" size={24} color={colors.danger} />
            <Text style={styles.featureTitle}>Advanced Protection</Text>
          </View>
          <Text style={styles.paragraph}>
            This app includes multiple layers of protection to prevent unauthorized access:
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Anti-Bypass Technology:</Text> Prevents hackers from reading 
              through or bypassing protection mechanisms
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Real-time Monitoring:</Text> Continuously monitors for suspicious 
              activity and unauthorized access attempts
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Background Protection:</Text> Runs silently in the background 
              with notifications for detected threats
            </Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>
              <Text style={styles.bold}>Network Security:</Text> Blocks unauthorized internet users from 
              accessing your device or data
            </Text>
          </View>
        </View>

        {/* Support */}
        <View style={[commonStyles.card, styles.supportCard]}>
          <IconSymbol name="envelope.fill" size={24} color={colors.primary} />
          <Text style={styles.supportText}>
            For support or questions, please contact our security team. 
            Your device security is our top priority.
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
  headerSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 16,
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 12,
  },
  paragraph: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 15,
    color: colors.primary,
    marginRight: 8,
    fontWeight: '700',
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '600',
    color: colors.text,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    paddingTop: 4,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#E3F2FD',
  },
  supportText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
});
