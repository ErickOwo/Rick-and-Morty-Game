import { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";

import useAleatoryCharacters from "@hooks/useAleatoryCharacters";

const API = process.env.NEXT_PUBLIC_API;

const useGetData = () =>{
  const [nextLevel, setNextLevel] = useState({});
  const [characters, setCharacters] = useState([]);
  const [ tryData, setTryData ] = useState(0);

  useEffect(()=>{
    const getData = async API =>{
      const response = await axios(API);
      setNextLevel(response.data.info.next);
      const aleatories = await useAleatoryCharacters(API);
      setCharacters(aleatories);
    } 
    getData(API);
  }, [ tryData ]);

  const turnedFalse = ( id1, id2 )=>{
    const actualizedCharacters = characters.map(character => { 
      if(!character.finded && character.idCard == id1.idCard ) character.turned = false;
      if(!character.finded && character.idCard == id2.idCard ) character.turned = false;
      return(character);
    });
    setCharacters(actualizedCharacters);
  }
  const turnedCard = idCard =>{
    const actualizedCharacters = characters.map(character => {
      if(character.idCard === idCard) character.turned = true;
      return character;
    });
    setCharacters(actualizedCharacters);
  }
  const findedCards = id =>{
    const actualizedCharacters = characters.map(character => {
      if(character.id === id) character.finded = true;
      return character;
    })
    setCharacters(actualizedCharacters);
  }

  return({
    nextLevel,
    characters, 
    turnedFalse,
    turnedCard,
    findedCards,
    setTryData,
    tryData,
  });
};

export default useGetData;