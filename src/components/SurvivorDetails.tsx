import { Dialog, Skeleton, Button, Text } from '@altitude-ui/react';
import Image from 'next/image';

type SurvivorDetailsProps = {
  name: string;
  quote: string;
  desc: string;
  survivorImage: string;
  zombivorImage: string;
  isLoading: boolean;
  isSurvivorInfected: boolean;
  handleIsInfected: () => void;
};

export function SurvivorDetails({
  name,
  quote,
  desc,
  survivorImage,
  zombivorImage,
  isLoading,
  isSurvivorInfected,
  handleIsInfected,
}: SurvivorDetailsProps) {
  return (
    <Dialog openDialogText="More info">
      <div className="flex w-full items-center">
        <div className="sm:flex relative w-3/12 h-80 hidden">
          {isLoading ? (
            <Skeleton />
          ) : (
            <Image
              src={isSurvivorInfected ? zombivorImage : survivorImage}
              alt={name}
              fill
              style={{ objectFit: 'cover', objectPosition: '15%' }}
              className="rounded-lg"
            />
          )}
        </div>
        <div className="flex flex-col w-9/12 ml-4 space-y-2">
          <Text className="!text-zinc-800">
            <strong>Identification:</strong> {name}
          </Text>
          <Text className="!text-zinc-800">
            <strong>Quote:</strong> {quote}
          </Text>
          <Text className="!text-zinc-800">
            <strong>Description:</strong> {desc}
          </Text>
          <Text className="!text-zinc-800">
            <strong>Current state:</strong>{' '}
            {isSurvivorInfected ? 'Infected' : 'Human'}
          </Text>
          <div className="flex w-full justify-center mt-auto">
            <Button
              isLoading={isLoading}
              variant="secondary"
              onClick={handleIsInfected}
            >
              Mark as {isSurvivorInfected ? 'Human' : 'Infected'}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
