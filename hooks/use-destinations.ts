import { useQuery } from '@tanstack/react-query';
import { mockDestinations, Destination } from '@/data/mockDestinations';

const fetchDestinations = async (): Promise<Destination[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockDestinations;
};

export const useDestinations = () => {
  return useQuery({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
  });
};
