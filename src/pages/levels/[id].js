import CardsContainer from '@containers/CardsContainer';
import Head from 'next/head';

const Levels = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/portal.png" />
        <title>Rick and Morty Game</title>
      </Head>
      <CardsContainer />
    </>
  );
};
export default Levels;
