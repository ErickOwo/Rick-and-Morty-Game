import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import useAleatoryCharacters from "@hooks/useAleatoryCharacters";

const API = process.env.NEXT_PUBLIC_API;

const useGetData = () =>{
  const [characters, setCharacters] = useState([]);
  const [ tryData, setTryData ] = useState(0);
  const [ winData, setWinData ] = useState(0);

  const router = useRouter();

  useEffect(()=>{
    const { id } = router.query;

    if (!router?.isReady) return;
    const getData = async API =>{
      const aleatories = await useAleatoryCharacters(API, id);
      setCharacters(aleatories);
    } 
    getData(API);
  }, [ tryData, winData, router?.isReady ]);

  const turnedFalse = ( id1, id2 )=>{
    characters.map(character => { 
      if(!character.finded && character.idCard == id1.idCard ) character.turned = false;
      if(!character.finded && character.idCard == id2.idCard ) character.turned = false;
      return(character);
    });
    setCharacters(characters);
  }
  const turnedCard = idCard =>{
    characters.map(character => {
      if(character.idCard === idCard) character.turned = true;
      return character;
    });
    setCharacters(characters);
  }
  const findedCards = id =>{
    characters.map(character => {
      if(character.id === id) character.finded = true;
      return character;
    })
    setCharacters(characters);
  }

  return({
    characters, 
    turnedFalse,
    turnedCard,
    findedCards,
    tryData,
    setTryData,
    winData,
    setWinData,
  });
};

export default useGetData;