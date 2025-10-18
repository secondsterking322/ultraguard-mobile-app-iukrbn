
import React from 'react';
import { Platform } from 'react-native';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { Stack } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';

export default function TabLayout() {
  const tabs: TabBarItem[] = [
    {
      name: '(home)',
      route: '/(tabs)/(home)/',
      icon: 'shield.fill',
      label: 'Security',
    },
    {
      name: 'filemanager',
      route: '/(tabs)/filemanager',
      icon: 'folder.fill',
      label: 'Files',
    },
    {
      name: 'cloud',
      route: '/(tabs)/cloud',
      icon: 'cloud.fill',
      label: 'Cloud',
    },
    {
      name: 'manual',
      route: '/(tabs)/manual',
      icon: 'book.fill',
      label: 'Manual',
    },
  ];

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs>
        <NativeTabs.Trigger name="(home)">
          <Icon sf="shield.fill" drawable="ic_security" />
          <Label>Security</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="filemanager">
          <Icon sf="folder.fill" drawable="ic_folder" />
          <Label>Files</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="cloud">
          <Icon sf="cloud.fill" drawable="ic_cloud" />
          <Label>Cloud</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="manual">
          <Icon sf="book.fill" drawable="ic_book" />
          <Label>Manual</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="(home)" />
        <Stack.Screen name="filemanager" />
        <Stack.Screen name="cloud" />
        <Stack.Screen name="manual" />
      </Stack>
      <FloatingTabBar tabs={tabs} />
    </>
  );
}
