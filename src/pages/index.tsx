/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-unstable-nested-components */
import { SurvivorCard } from '@/components/SurvivorCard';
import { ChangeEvent, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Heading } from '@altitude-ui/react';
import { useSurvivors } from '@/services/queries/use-survivors';
import { SurvivorCardSkeleton } from '@/components/SurvivorCardSkeleton';
import Head from 'next/head';
import { Filter } from '@/components/Filter';

export default function Home() {
  const [search, setSearch] = useState('');
  const [searchByInfected, setSearchByInfected] = useState(false);
  const { inView, ref } = useInView();
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isRefetching,
  } = useSurvivors(searchByInfected, search);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchByInfected = () => {
    setSearchByInfected((prev) => !prev);
  };

  const survivors = data?.pages.flatMap((page) => page.data);

  if (error) {
    return `An error has occurred: ${error}`;
  }

  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <Head>
        <title>Survivors</title>
      </Head>
      <div className="w-full max-w-7xl flex flex-col items-center">
        <Filter
          handleSearch={handleSearch}
          handleSearchByInfected={handleSearchByInfected}
          search={search}
          searchByInfected={searchByInfected}
        />
        <div className="flex flex-wrap gap-8 items-center justify-center">
          {!isRefetching &&
            survivors?.map((survivor, index, array) => {
              if (survivor.name.includes(search)) {
                return (
                  <div
                    key={survivor.id}
                    ref={index === array.length - 1 ? ref : null}
                  >
                    <SurvivorCard
                      id={survivor.id}
                      name={survivor.name}
                      quote={survivor.quote}
                      desc={survivor.desc}
                      isInfected={survivor.isInfected}
                      survivorImage={survivor.survivorImage}
                      zombivorImage={survivor.zombivorImage}
                    />
                  </div>
                );
              }
            })}
          <SurvivorCardSkeleton
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            isRefetching={isRefetching}
          />
        </div>
        {!isLoading && !hasNextPage && !isRefetching && (
          <div className="my-8">
            <Heading as="h2">No more survivors...</Heading>
          </div>
        )}
      </div>
    </div>
  );
}
