import { survivorsUrl } from '@/constants/urls';
import { SurvivorProps } from '@/types/survivor.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { http } from '../http';

type Response = {
  next_page: number | undefined;
  survivors: SurvivorProps[];
};

export const useSurvivors = (searchByInfected: boolean) => {
  return useInfiniteQuery(
    ['survivors', searchByInfected],
    async ({ pageParam = 1 }) => {
      const res = await http.get<Response>(`${survivorsUrl}`, {
        params: {
          limit: 10,
          page: pageParam,
          isInfected: searchByInfected,
        },
      });
      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.next_page;
      },
      keepPreviousData: true,
    }
  );
};
