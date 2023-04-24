/* eslint-disable react/no-unstable-nested-components */
import { TextInput, Button, Text } from '@altitude-ui/react';
import { Search } from 'lucide-react';

type FilterProps = {
  search: string;
  searchByInfected: boolean;
  handleSearch: (e) => void;
  handleSearchByInfected: () => void;
};

export function Filter({
  search,
  searchByInfected,
  handleSearch,
  handleSearchByInfected,
}: FilterProps) {
  return (
    <div className="flex my-10 justify-center items-center flex-col w-3/4 lg:w-2/4">
      <TextInput
        value={search}
        icon={() => <Search color="#FFF" className="!mr-2" />}
        onChange={handleSearch}
      />
      <div className="lg:flex-row lg:space-y-0 space-y-2 flex-col mt-4 flex w-2/4 justify-around ">
        <Button
          variant="secondary"
          onClick={handleSearchByInfected}
          disabled={!searchByInfected}
        >
          <Text>Survivors</Text>
        </Button>
        <Button
          variant="secondary"
          onClick={handleSearchByInfected}
          disabled={searchByInfected}
        >
          <Text>Infected</Text>
        </Button>
      </div>
    </div>
  );
}
