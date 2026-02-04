import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockRecentSearches, RecentSearch } from '@/data/mockCategories';

const STORAGE_KEY = '@recent_searches';

const fetchRecentSearches = async (): Promise<RecentSearch[]> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return mockRecentSearches;
  } catch {
    return mockRecentSearches;
  }
};

const deleteRecentSearch = async (id: string): Promise<RecentSearch[]> => {
  const searches = await fetchRecentSearches();
  const updated = searches.filter((search) => search.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const useRecentSearches = () => {
  return useQuery({
    queryKey: ['recentSearches'],
    queryFn: fetchRecentSearches,
  });
};

export const useDeleteRecentSearch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRecentSearch,
    onSuccess: (data) => {
      queryClient.setQueryData(['recentSearches'], data);
    },
  });
};
