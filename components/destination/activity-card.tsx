import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { Activity } from '@/data/mockActivities';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ActivityCardProps {
  activity: Activity;
  onBook?: (activity: Activity) => void;
}

export function ActivityCard({ activity, onBook }: ActivityCardProps) {
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

  const handleBook = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onBook?.(activity);
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor: cardBackground }]}
      onPress={handleBook}>
      <Image
        source={{ uri: activity.image }}
        style={styles.image}
        contentFit="cover"
        placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
      />

      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{activity.category}</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>
          {activity.title}
        </Text>

        <Text style={styles.description} numberOfLines={2}>
          {activity.description}
        </Text>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>⏱️</Text>
            <Text style={styles.detailText}>{activity.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>⭐</Text>
            <Text style={styles.detailText}>
              {activity.rating} ({activity.reviewCount})
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={[styles.price, { color: textColor }]}>
              ${activity.price}
            </Text>
          </View>
          <Pressable onPress={handleBook} style={styles.bookButton}>
            <Text style={styles.bookText}>Book Now</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
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
  image: {
    width: '100%',
    height: 180,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailIcon: {
    fontSize: 14,
  },
  detailText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  priceLabel: {
    fontSize: 13,
    color: '#8E8E93',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
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
