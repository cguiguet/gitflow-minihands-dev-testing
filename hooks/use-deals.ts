import { useQuery } from '@tanstack/react-query';
import { mockDeals, Deal } from '@/data/mockDeals';

const fetchDeals = async (): Promise<Deal[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return mockDeals;
};

export const useDeals = () => {
  return useQuery({
    queryKey: ['deals'],
    queryFn: fetchDeals,
  });
};
