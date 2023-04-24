import { survivorsUrl } from '@/constants/urls';
import { SurvivorProps } from '@/types/survivor.types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { http } from '../http';

export const useSurvivors = (searchByInfected: boolean, search: string) => {
  return useInfiniteQuery(
    ['survivors', searchByInfected],
    async ({ pageParam = 1 }) => {
      const res = await http.get<SurvivorProps>(`${survivorsUrl}`, {
        params: {
          _limit: 10,
          _page: pageParam,
          isInfected: searchByInfected,
          name_like: search,
        },
      });
      return res;
    },
    {
      getNextPageParam: (lastPage) => {
        const linkHeader = lastPage.headers.link as string;
        const nextPageRegex = /<([^>]+)>;\s*rel="next"/;
        const nextPageMatch = linkHeader.match(nextPageRegex);
        const nextPageUrl = nextPageMatch ? nextPageMatch[1] : null;
        if (!nextPageUrl) return undefined;
        let nextPage: string | null = null;
        if (nextPageUrl) {
          nextPage = new URLSearchParams(nextPageUrl).get('_page');
        }
        return nextPage;
      },
      keepPreviousData: true,
    }
  );
};
