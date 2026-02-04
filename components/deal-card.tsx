import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { Deal } from '@/data/mockDeals';
import { useThemeColor } from '@/hooks/use-theme-color';

interface DealCardProps {
  deal: Deal;
  onPress?: () => void;
}

export function DealCard({ deal, onPress }: DealCardProps) {
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  const getTypeLabel = (type: Deal['type']) => {
    const labels = {
      flight: '✈️ Flight',
      hotel: '🏨 Hotel',
      package: '📦 Package',
    };
    return labels[type];
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: cardBackground },
        pressed && styles.pressed,
      ]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: deal.image }}
          style={styles.image}
          contentFit="cover"
          transition={300}
          placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
        />
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{deal.discount}% OFF</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.typeLabel}>{getTypeLabel(deal.type)}</Text>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
          {deal.title}
        </Text>
        <Text style={styles.destination}>{deal.destination}</Text>
        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.originalPrice}>${deal.originalPrice}</Text>
            <Text style={[styles.discountedPrice, { color: textColor }]}>
              ${deal.discountedPrice}
            </Text>
          </View>
          <Text style={styles.validUntil}>Valid until {new Date(deal.validUntil).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    padding: 16,
  },
  typeLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  destination: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  discountedPrice: {
    fontSize: 22,
    fontWeight: '700',
  },
  validUntil: {
    fontSize: 11,
    color: '#8E8E93',
  },
});
