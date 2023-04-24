import Image from 'next/image';
import { useState } from 'react';
import { Box, Heading, Skeleton, Text } from '@altitude-ui/react';
import { useSurvivorIsInfectedMutation } from '@/services/mutations/survivors';
import { SurvivorDetails } from './SurvivorDetails';

type Props = {
  id: string;
  name: string;
  quote: string;
  desc: string;
  survivorImage: string;
  zombivorImage: string;
  isInfected: boolean;
};

export function SurvivorCard({
  id,
  name,
  quote,
  desc,
  survivorImage,
  zombivorImage,
  isInfected,
}: Props) {
  const [isSurvivorInfected, setIsSurvivorInfected] = useState(isInfected);

  const { mutate, isLoading } = useSurvivorIsInfectedMutation({
    id,
    isSurvivorInfected,
  });

  const handleIsInfected = async () => {
    setIsSurvivorInfected((prev) => !prev);
    mutate();
  };

  return (
    <Box className="!p-0 w-92 max-w-92 h-80 flex flex-row rounded-lg bg-white">
      <div className="relative w-44 min-w-44">
        {isLoading ? (
          <Skeleton />
        ) : (
          <Image
            src={isSurvivorInfected ? zombivorImage : survivorImage}
            alt={name}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: '15%' }}
            className="rounded-l-lg"
            priority
          />
        )}
      </div>
      <Box className="!border-0 flex flex-col justify-between w-48">
        <div>
          <Heading className="text-2xl font-bold">{name.split(' ')[0]}</Heading>
          <Text
            size="sm"
            className="text-xs !text-zinc-400 font-light tracking-widest"
          >
            {name.split(' ').slice(1).join(' ')}
          </Text>
          <Text size="sm" className="!mt-3">
            {quote}
          </Text>
        </div>
        <SurvivorDetails
          name={name}
          quote={quote}
          desc={desc}
          survivorImage={survivorImage}
          zombivorImage={zombivorImage}
          isSurvivorInfected={isSurvivorInfected}
          isLoading={isLoading}
          handleIsInfected={handleIsInfected}
        />
      </Box>
    </Box>
  );
}
