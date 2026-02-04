import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { Destination } from '@/data/mockDestinations';
import { useThemeColor } from '@/hooks/use-theme-color';

interface DestinationCardProps {
  destination: Destination;
  onPress?: () => void;
}

export function DestinationCard({ destination, onPress }: DestinationCardProps) {
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: cardBackground },
        pressed && styles.pressed,
      ]}>
      <Image
        source={{ uri: destination.image }}
        style={styles.image}
        contentFit="cover"
        transition={300}
        placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.locationInfo}>
            <Text style={[styles.name, { color: textColor }]}>{destination.name}</Text>
            <Text style={styles.country}>{destination.country}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={[styles.rating, { color: textColor }]}>{destination.rating}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>From</Text>
          <Text style={[styles.price, { color: textColor }]}>
            ${destination.price}
            <Text style={styles.priceUnit}>/person</Text>
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
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
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  locationInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  country: {
    fontSize: 14,
    color: '#8E8E93',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  priceLabel: {
    fontSize: 14,
    color: '#8E8E93',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8E8E93',
  },
});
