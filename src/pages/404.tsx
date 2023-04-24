import { Heading, Text } from '@altitude-ui/react';
import Link from 'next/link';

export default function PageNotFound() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center space-y-2">
      <Heading as="h1">PAGE NOT FOUND</Heading>
      <Text>
        <Link href="/" className="text-red-500">
          Go back
        </Link>{' '}
        or you will get infected!!
      </Text>
    </div>
  );
}
