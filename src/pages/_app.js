import { ProviderInterface } from '@hooks/useInterface';
import Head from "next/head";
import '@styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  return(
    <>
      <ProviderInterface>
        <Head>
          <link rel="icon" href="/portal.png" />
          <title>Rick and Morty Game App</title>
        </Head>  
        <main>
          <Component {...pageProps} />
        </main>
      </ProviderInterface>
    </>
  )
};

export default MyApp;
