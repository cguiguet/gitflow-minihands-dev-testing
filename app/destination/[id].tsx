import { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  StatusBar,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Image } from 'expo-image';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import * as Sharing from 'expo-sharing';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';
import { mockDestinations } from '@/data/mockDestinations';
import { getFlightsByDestination } from '@/data/mockFlights';
import { getHotelsByDestination } from '@/data/mockHotels';
import { getActivitiesByDestination } from '@/data/mockActivities';
import { getReviewsByDestination, getReviewStats } from '@/data/mockReviews';
import { getWeatherByDestination } from '@/data/mockWeather';
import { FlightCard } from '@/components/destination/flight-card';
import { HotelCard } from '@/components/destination/hotel-card';
import { ActivityCard } from '@/components/destination/activity-card';
import { ReviewCard } from '@/components/destination/review-card';
import { WeatherWidget } from '@/components/destination/weather-widget';
import { DestinationCard } from '@/components/destination-card';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.5;
const HEADER_HEIGHT = 100;

type Tab = 'overview' | 'flights' | 'hotels' | 'activities' | 'reviews';

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'flights', label: 'Flights' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'activities', label: 'Activities' },
  { id: 'reviews', label: 'Reviews' },
];

export default function DestinationDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scrollY = useSharedValue(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const destination = mockDestinations.find((d) => d.id === id);
  const flights = getFlightsByDestination(id);
  const hotels = getHotelsByDestination(id);
  const activities = getActivitiesByDestination(id);
  const reviews = getReviewsByDestination(id);
  const reviewStats = getReviewStats(reviews);
  const weather = getWeatherByDestination(id);
  const similarDestinations = mockDestinations.filter((d) => d.id !== id).slice(0, 5);

  if (!destination) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={[styles.errorText, { color: textColor }]}>Destination not found</Text>
      </View>
    );
  }

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsFavorite(!isFavorite);
  };

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync('', {
          dialogTitle: `Check out ${destination.name}!`,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleTabChange = (tab: Tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT - HEADER_HEIGHT],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  const heroAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HERO_HEIGHT],
      [0, -HERO_HEIGHT / 2],
      Extrapolate.CLAMP
    );

    const scale = interpolate(scrollY.value, [-100, 0], [1.5, 1], Extrapolate.CLAMP);

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const handleScroll = (event: any) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />

      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <Animated.View style={[styles.heroContainer, heroAnimatedStyle]}>
          <Image
            source={{ uri: destination.image }}
            style={styles.heroImage}
            contentFit="cover"
            placeholder={{ blurhash: 'LKO2?U%2Tw=w]~RBVZRi};RPxuwH' }}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{destination.name}</Text>
            <Text style={styles.heroSubtitle}>{destination.country}</Text>
          </View>
        </Animated.View>

        <View style={[styles.content, { backgroundColor }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabBar}
            contentContainerStyle={styles.tabBarContent}>
            {tabs.map((tab) => (
              <Pressable
                key={tab.id}
                onPress={() => handleTabChange(tab.id)}
                style={[styles.tab, activeTab === tab.id && styles.tabActive]}>
                <Text
                  style={[
                    styles.tabText,
                    { color: textColor },
                    activeTab === tab.id && styles.tabTextActive,
                  ]}>
                  {tab.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {activeTab === 'overview' && (
            <View style={styles.tabContent}>
              <Text style={[styles.description, { color: textColor }]}>
                {destination.description}
              </Text>

              {destination.highlights && destination.highlights.length > 0 && (
                <View style={styles.highlightsContainer}>
                  <Text style={[styles.sectionTitle, { color: textColor }]}>Highlights</Text>
                  <View style={styles.highlightsGrid}>
                    {destination.highlights.map((highlight, index) => (
                      <View key={index} style={styles.highlightItem}>
                        <Text style={styles.highlightIcon}>✨</Text>
                        <Text style={[styles.highlightText, { color: textColor }]}>{highlight}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {destination.quickFacts && (
                <View style={styles.quickFactsContainer}>
                  <Text style={[styles.sectionTitle, { color: textColor }]}>Quick Facts</Text>
                  <View style={styles.quickFactsGrid}>
                    <View style={styles.quickFactItem}>
                      <Text style={styles.quickFactIcon}>🗣️</Text>
                      <Text style={styles.quickFactLabel}>Language</Text>
                      <Text style={[styles.quickFactValue, { color: textColor }]}>
                        {destination.quickFacts.language}
                      </Text>
                    </View>
                    <View style={styles.quickFactItem}>
                      <Text style={styles.quickFactIcon}>💰</Text>
                      <Text style={styles.quickFactLabel}>Currency</Text>
                      <Text style={[styles.quickFactValue, { color: textColor }]}>
                        {destination.quickFacts.currency}
                      </Text>
                    </View>
                    <View style={styles.quickFactItem}>
                      <Text style={styles.quickFactIcon}>🕐</Text>
                      <Text style={styles.quickFactLabel}>Timezone</Text>
                      <Text style={[styles.quickFactValue, { color: textColor }]}>
                        {destination.quickFacts.timezone}
                      </Text>
                    </View>
                    <View style={styles.quickFactItem}>
                      <Text style={styles.quickFactIcon}>📋</Text>
                      <Text style={styles.quickFactLabel}>Visa</Text>
                      <Text style={[styles.quickFactValue, { color: textColor }]}>
                        {destination.quickFacts.visa}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {weather && <WeatherWidget weather={weather} />}
            </View>
          )}

          {activeTab === 'flights' && (
            <View style={styles.tabContent}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Available Flights</Text>
              <Text style={[styles.sectionSubtitle, { color: textColor }]}>
                {flights.length} flights found
              </Text>
              {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
              ))}
            </View>
          )}

          {activeTab === 'hotels' && (
            <View style={styles.tabContent}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Hotels & Accommodations</Text>
              <Text style={[styles.sectionSubtitle, { color: textColor }]}>
                {hotels.length} properties available
              </Text>
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </View>
          )}

          {activeTab === 'activities' && (
            <View style={styles.tabContent}>
              <Text style={[styles.sectionTitle, { color: textColor }]}>Things to Do</Text>
              <Text style={[styles.sectionSubtitle, { color: textColor }]}>
                {activities.length} activities available
              </Text>
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </View>
          )}

          {activeTab === 'reviews' && (
            <View style={styles.tabContent}>
              <View style={styles.reviewsHeader}>
                <Text style={[styles.sectionTitle, { color: textColor }]}>Reviews</Text>
                <View style={styles.reviewsStats}>
                  <Text style={[styles.reviewsAverage, { color: textColor }]}>
                    {reviewStats.average}
                  </Text>
                  <View style={styles.reviewsStars}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Text key={i} style={styles.star}>
                        {i < Math.round(reviewStats.average) ? '⭐' : '☆'}
                      </Text>
                    ))}
                  </View>
                  <Text style={styles.reviewsCount}>
                    Based on {reviewStats.total} reviews
                  </Text>
                </View>
              </View>

              <View style={styles.reviewsBreakdown}>
                {Object.entries(reviewStats.breakdown)
                  .reverse()
                  .map(([rating, count]) => (
                    <View key={rating} style={styles.breakdownRow}>
                      <Text style={styles.breakdownRating}>{rating}★</Text>
                      <View style={styles.breakdownBar}>
                        <View
                          style={[
                            styles.breakdownFill,
                            { width: `${(count / reviewStats.total) * 100}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.breakdownCount}>{count}</Text>
                    </View>
                  ))}
              </View>

              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </View>
          )}

          <View style={styles.similarSection}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>You Might Also Like</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.similarList}>
              {similarDestinations.map((dest) => (
                <View key={dest.id} style={styles.similarCard}>
                  <DestinationCard destination={dest} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Animated.ScrollView>

      <View style={styles.floatingCTA}>
        <View style={styles.ctaContent}>
          <View style={styles.ctaPrice}>
            <Text style={styles.ctaLabel}>From</Text>
            <Text style={styles.ctaPriceText}>${destination.price}</Text>
          </View>
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Book Now</Text>
          </Pressable>
        </View>
      </View>

      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        <View style={styles.headerBackground} />
        <View style={styles.headerContent}>
          <Pressable onPress={handleBack} style={styles.headerButton}>
            <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
          </Pressable>
          <View style={styles.headerActions}>
            <Pressable onPress={handleShare} style={styles.headerButton}>
              <IconSymbol name="square.and.arrow.up" size={22} color="#FFFFFF" />
            </Pressable>
            <Pressable onPress={handleFavorite} style={styles.headerButton}>
              <IconSymbol
                name={isFavorite ? 'heart.fill' : 'heart'}
                size={22}
                color={isFavorite ? '#FF3B30' : '#FFFFFF'}
              />
            </Pressable>
          </View>
        </View>
      </Animated.View>

      <View style={styles.floatingHeader}>
        <Pressable onPress={handleBack} style={styles.floatingButton}>
          <IconSymbol name="chevron.left" size={24} color="#FFFFFF" />
        </Pressable>
        <View style={styles.floatingActions}>
          <Pressable onPress={handleShare} style={styles.floatingButton}>
            <IconSymbol name="square.and.arrow.up" size={22} color="#FFFFFF" />
          </Pressable>
          <Pressable onPress={handleFavorite} style={styles.floatingButton}>
            <IconSymbol
              name={isFavorite ? 'heart.fill' : 'heart'}
              size={22}
              color={isFavorite ? '#FF3B30' : '#FFFFFF'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroContainer: {
    height: HERO_HEIGHT,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroSubtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    zIndex: 100,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFF',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingHeader: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 99,
  },
  floatingActions: {
    flexDirection: 'row',
    gap: 12,
  },
  floatingButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    opacity: 0.8,
  },
  highlightsContainer: {
    marginBottom: 32,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  highlightIcon: {
    fontSize: 18,
  },
  highlightText: {
    fontSize: 15,
    fontWeight: '500',
  },
  quickFactsContainer: {
    marginBottom: 32,
  },
  quickFactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickFactItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F2F2F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickFactIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickFactLabel: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 4,
  },
  quickFactValue: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  bestTimeContainer: {
    marginBottom: 32,
  },
  bestTimeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  bestTimeIcon: {
    fontSize: 32,
  },
  bestTimeText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  tabBar: {
    marginBottom: 20,
  },
  tabBarContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
  },
  tabActive: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  sectionSubtitle: {
    fontSize: 15,
    opacity: 0.7,
    marginBottom: 20,
  },
  reviewsHeader: {
    marginBottom: 24,
  },
  reviewsStats: {
    alignItems: 'center',
    marginTop: 16,
  },
  reviewsAverage: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 8,
  },
  reviewsStars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  star: {
    fontSize: 20,
  },
  reviewsCount: {
    fontSize: 14,
    color: '#8E8E93',
  },
  reviewsBreakdown: {
    marginBottom: 24,
    gap: 8,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  breakdownRating: {
    fontSize: 14,
    fontWeight: '600',
    width: 30,
  },
  breakdownBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  breakdownFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  breakdownCount: {
    fontSize: 14,
    color: '#8E8E93',
    width: 30,
    textAlign: 'right',
  },
  similarSection: {
    marginTop: 40,
    marginBottom: 20,
  },
  similarList: {
    paddingTop: 16,
  },
  similarCard: {
    marginRight: 16,
  },
  floatingCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  ctaContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  ctaPrice: {
    gap: 4,
  },
  ctaLabel: {
    fontSize: 13,
    color: '#8E8E93',
  },
  ctaPriceText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
});
