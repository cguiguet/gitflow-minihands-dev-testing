import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { Hotel } from '@/data/mockHotels';
import { useThemeColor } from '@/hooks/use-theme-color';

interface HotelCardProps {
  hotel: Hotel;
  onBook?: (hotel: Hotel) => void;
}

const amenityIcons: Record<string, string> = {
  WiFi: '📶',
  Pool: '🏊',
  Spa: '💆',
  Restaurant: '🍽️',
  Gym: '💪',
  Parking: '🅿️',
  Bar: '🍸',
  Concierge: '🛎️',
  Kitchen: '🍳',
  'Pet-friendly': '🐕',
  Breakfast: '🥐',
  Terrace: '🌿',
  'River View': '🌊',
};

export function HotelCard({ hotel, onBook }: HotelCardProps) {
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

  const handleBook = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onBook?.(hotel);
  };

  const handleViewDetails = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={styles.imageCarousel}>
        {hotel.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
            placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
          />
        ))}
      </ScrollView>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.name, { color: textColor }]}>{hotel.name}</Text>
            <View style={styles.ratingRow}>
              <View style={styles.stars}>
                {Array.from({ length: hotel.starRating }).map((_, i) => (
                  <Text key={i} style={styles.star}>
                    ⭐
                  </Text>
                ))}
              </View>
              <View style={styles.reviewBadge}>
                <Text style={styles.reviewScore}>{hotel.reviewScore}</Text>
                <Text style={styles.reviewCount}>({hotel.reviewCount})</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.locationContainer}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.location}>{hotel.location}</Text>
          <Text style={styles.distance}>• {hotel.distance}</Text>
        </View>

        <View style={styles.amenitiesContainer}>
          {hotel.amenities.slice(0, 6).map((amenity, index) => (
            <View key={index} style={styles.amenityChip}>
              <Text style={styles.amenityIcon}>{amenityIcons[amenity] || '✓'}</Text>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={[styles.price, { color: textColor }]}>
              ${hotel.pricePerNight}
              <Text style={styles.priceUnit}>/night</Text>
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable onPress={handleViewDetails} style={styles.detailsButton}>
              <Text style={styles.detailsText}>Details</Text>
            </Pressable>
            <Pressable onPress={handleBook} style={styles.bookButton}>
              <Text style={styles.bookText}>Book</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  imageCarousel: {
    height: 200,
  },
  image: {
    width: 300,
    height: 200,
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  titleContainer: {
    gap: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 14,
  },
  reviewBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  reviewCount: {
    fontSize: 14,
    color: '#8E8E93',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  location: {
    fontSize: 14,
    color: '#8E8E93',
  },
  distance: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 4,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  amenityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  amenityIcon: {
    fontSize: 12,
  },
  amenityText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3C3C43',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    gap: 4,
  },
  priceLabel: {
    fontSize: 13,
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
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  detailsButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  bookButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#007AFF',
  },
  bookText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
