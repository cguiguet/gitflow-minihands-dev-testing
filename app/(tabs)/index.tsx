import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Pressable,
  RefreshControl,
  Dimensions,
  ViewToken,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DestinationCard } from '@/components/destination-card';
import { DealCard } from '@/components/deal-card';
import { CategoryChip } from '@/components/category-chip';
import { DestinationCardSkeleton, DealCardSkeleton } from '@/components/ui/skeleton';
import { useDestinations } from '@/hooks/use-destinations';
import { useDeals } from '@/hooks/use-deals';
import { useRecentSearches, useDeleteRecentSearch } from '@/hooks/use-recent-searches';
import { mockCategories } from '@/data/mockCategories';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Destination } from '@/data/mockDestinations';
import { Deal } from '@/data/mockDeals';
import { ThemeToggle } from '@/components/theme-toggle';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBackground = useThemeColor({ light: '#F2F2F7', dark: '#2C2C2E' }, 'background');

  const [activeDestinationIndex, setActiveDestinationIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);

  const { data: destinations, isLoading: destinationsLoading, refetch: refetchDestinations } = useDestinations();
  const { data: deals, isLoading: dealsLoading, refetch: refetchDeals } = useDeals();
  const { data: recentSearches, refetch: refetchRecentSearches } = useRecentSearches();
  const deleteSearchMutation = useDeleteRecentSearch();

  const onViewChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setActiveDestinationIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const onRefresh = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRefreshing(true);
    await Promise.all([refetchDestinations(), refetchDeals(), refetchRecentSearches()]);
    setRefreshing(false);
  }, [refetchDestinations, refetchDeals, refetchRecentSearches]);

  const handleSearchPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/search');
  };

  const handleDeleteSearch = (id: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    deleteSearchMutation.mutate(id);
  };

  const renderDestinationItem = ({ item }: { item: Destination }) => (
    <DestinationCard destination={item} />
  );

  const renderDealItem = ({ item }: { item: Deal }) => <DealCard deal={item} />;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 16 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={textColor} />
        }>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: textColor }]}>Good morning ☀️</Text>
            <Text style={[styles.subtitle, { color: textColor }]}>Where would you like to go?</Text>
          </View>
          <Pressable
            style={[styles.avatar, { backgroundColor: cardBackground }]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setShowThemeToggle(true);
            }}>
            <Text style={styles.avatarText}>JD</Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.searchBar, { backgroundColor: cardBackground }]}
          onPress={handleSearchPress}>
          <IconSymbol name="magnifyingglass" size={20} color="#8E8E93" />
          <Text style={styles.searchPlaceholder}>Where to?</Text>
          <IconSymbol name="slider.horizontal.3" size={20} color="#8E8E93" />
        </Pressable>

        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}>
            {mockCategories.map((category) => (
              <CategoryChip key={category.id} category={category} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Popular Destinations</Text>
            <Pressable onPress={() => Haptics.selectionAsync()}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          {destinationsLoading ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <DestinationCardSkeleton />
              <DestinationCardSkeleton />
            </ScrollView>
          ) : (
            <>
              <FlatList
                horizontal
                data={destinations}
                renderItem={renderDestinationItem}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                snapToInterval={296}
                decelerationRate="fast"
                viewabilityConfig={viewConfigRef.current}
                onViewableItemsChanged={onViewChanged.current}
                contentContainerStyle={styles.listContent}
              />
              <View style={styles.pagination}>
                {destinations?.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === activeDestinationIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            </>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Featured Deals</Text>
            <Pressable onPress={() => Haptics.selectionAsync()}>
              <Text style={styles.seeAll}>See all</Text>
            </Pressable>
          </View>
          {dealsLoading ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <DealCardSkeleton />
              <DealCardSkeleton />
            </ScrollView>
          ) : (
            <FlatList
              horizontal
              data={deals}
              renderItem={renderDealItem}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </View>

        {recentSearches && recentSearches.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: textColor }]}>Recent Searches</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recentSearches.map((search) => (
                <Pressable
                  key={search.id}
                  style={[styles.recentSearchChip, { backgroundColor: cardBackground }]}
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}>
                  <View style={styles.recentSearchContent}>
                    <Text style={[styles.recentSearchDestination, { color: textColor }]}>
                      {search.destination}
                    </Text>
                    <Text style={styles.recentSearchDetails}>
                      {search.dates} • {search.travelers} {search.travelers === 1 ? 'traveler' : 'travelers'}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handleDeleteSearch(search.id)}
                    hitSlop={8}
                    style={styles.deleteButton}>
                    <IconSymbol name="xmark.circle.fill" size={20} color="#8E8E93" />
                  </Pressable>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
      <ThemeToggle visible={showThemeToggle} onClose={() => setShowThemeToggle(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007AFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C7C7CC',
  },
  paginationDotActive: {
    width: 20,
    backgroundColor: '#007AFF',
  },
  recentSearchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 12,
    marginLeft: 20,
  },
  recentSearchContent: {
    marginRight: 12,
  },
  recentSearchDestination: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  recentSearchDetails: {
    fontSize: 13,
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 4,
  },
});
