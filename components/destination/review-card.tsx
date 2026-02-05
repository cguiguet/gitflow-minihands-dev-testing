import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import * as Haptics from 'expo-haptics';
import { Review } from '@/data/mockReviews';
import { useThemeColor } from '@/hooks/use-theme-color';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [marked, setMarked] = useState(false);
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#FFFFFF', dark: '#1C1C1E' }, 'background');

  const handleHelpful = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (!marked) {
      setHelpful(helpful + 1);
      setMarked(true);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <View style={[styles.container, { backgroundColor: cardBackground }]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.avatar}>{review.userAvatar}</Text>
          <View style={styles.userDetails}>
            <Text style={[styles.userName, { color: textColor }]}>{review.userName}</Text>
            <View style={styles.metadata}>
              <Text style={styles.travelerType}>{review.travelerType}</Text>
              <Text style={styles.separator}>•</Text>
              <Text style={styles.date}>{formatDate(review.date)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.ratingContainer}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={styles.star}>
              {i < review.rating ? '⭐' : '☆'}
            </Text>
          ))}
        </View>
      </View>

      {review.title && (
        <Text style={[styles.title, { color: textColor }]}>{review.title}</Text>
      )}

      <Text style={[styles.text, { color: textColor }]}>{review.text}</Text>

      {review.photos && review.photos.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photosContainer}>
          {review.photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo }}
              style={styles.photo}
              contentFit="cover"
              placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
            />
          ))}
        </ScrollView>
      )}

      <Pressable
        onPress={handleHelpful}
        style={[styles.helpfulButton, marked && styles.helpfulButtonMarked]}>
        <Text style={[styles.helpfulIcon, marked && styles.helpfulIconMarked]}>👍</Text>
        <Text style={[styles.helpfulText, marked && styles.helpfulTextMarked]}>
          Helpful ({helpful})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatar: {
    fontSize: 32,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  travelerType: {
    fontSize: 13,
    color: '#8E8E93',
  },
  separator: {
    fontSize: 13,
    color: '#8E8E93',
  },
  date: {
    fontSize: 13,
    color: '#8E8E93',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  star: {
    fontSize: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  photosContainer: {
    marginBottom: 12,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    gap: 6,
  },
  helpfulButtonMarked: {
    backgroundColor: '#E3F2FD',
  },
  helpfulIcon: {
    fontSize: 16,
  },
  helpfulIconMarked: {
    fontSize: 16,
  },
  helpfulText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3C3C43',
  },
  helpfulTextMarked: {
    color: '#007AFF',
  },
});
