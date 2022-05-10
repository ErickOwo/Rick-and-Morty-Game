import CardsContainer from "@containers/CardsContainer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/portal.png" />
        <title>Rick and Morty Game</title>
      </Head>  
      <CardsContainer />
    </>
  )
}
