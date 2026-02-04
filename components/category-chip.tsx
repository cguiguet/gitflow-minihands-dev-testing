import { Text, StyleSheet, Pressable, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Category } from '@/data/mockCategories';
import { useThemeColor } from '@/hooks/use-theme-color';

interface CategoryChipProps {
  category: Category;
  onPress?: () => void;
}

export function CategoryChip({ category, onPress }: CategoryChipProps) {
  const textColor = useThemeColor({}, 'text');
  const chipBackground = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'background');

  const handlePress = () => {
    Haptics.selectionAsync();
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: chipBackground },
        pressed && styles.pressed,
      ]}>
      <IconSymbol
        name={category.icon as any}
        size={24}
        color={category.color}
        style={styles.icon}
      />
      <Text style={[styles.label, { color: textColor }]}>{category.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }],
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
});
