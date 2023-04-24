/* eslint-disable camelcase */
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Titillium_Web } from 'next/font/google';

const titilliumWeb = Titillium_Web({
  weight: ['200', '300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-titillium',
});

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <main className={`${titilliumWeb.variable} font-sans`}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </main>
  );
}
