import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useTheme } from '@/contexts/theme-context';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ThemeToggleProps {
  visible: boolean;
  onClose: () => void;
}

export function ThemeToggle({ visible, onClose }: ThemeToggleProps) {
  const { themeMode, setThemeMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'background');

  const handleThemeSelect = async (mode: 'light' | 'dark' | 'auto') => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await setThemeMode(mode);
    onClose();
  };

  const options = [
    { mode: 'light' as const, label: 'Light', icon: 'sun.max.fill' },
    { mode: 'dark' as const, label: 'Dark', icon: 'moon.fill' },
    { mode: 'auto' as const, label: 'Auto', icon: 'circle.lefthalf.filled' },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose} testID="theme-toggle-overlay">
        <View style={styles.container}>
          <View style={[styles.menu, { backgroundColor: cardBackground }]}>
            <Text style={[styles.title, { color: textColor }]}>Theme</Text>
            {options.map((option) => (
              <Pressable
                key={option.mode}
                style={[
                  styles.option,
                  themeMode === option.mode && styles.optionActive,
                  themeMode === option.mode && { backgroundColor },
                ]}
                onPress={() => handleThemeSelect(option.mode)}>
                <IconSymbol
                  name={option.icon}
                  size={22}
                  color={themeMode === option.mode ? '#007AFF' : textColor}
                />
                <Text
                  style={[
                    styles.optionText,
                    { color: textColor },
                    themeMode === option.mode && styles.optionTextActive,
                  ]}>
                  {option.label}
                </Text>
                {themeMode === option.mode && (
                  <IconSymbol name="checkmark" size={20} color="#007AFF" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 20,
  },
  container: {
    minWidth: 200,
  },
  menu: {
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 8,
    opacity: 0.6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 12,
  },
  optionActive: {
    opacity: 1,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  optionTextActive: {
    fontWeight: '600',
  },
});
