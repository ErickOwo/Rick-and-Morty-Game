import { useState } from 'react';

const useStartGame = () =>{
  const [ moves, setMoves ] = useState(0);
  const [ start, setStart ] = useState(false);
  const [ timeSeconds, setTimeSeconds ] = useState(0);
  const [ timeMinutes, setTimeMinutes ] = useState(0);
  const [ cardsTurned, setCardsTurned ] = useState([]);
  const [ hits, setHits ] = useState(0);
  const [ fails, setFails ] = useState(0)
  const [ won, setWon ] = useState(false);
  const [ openModal, setOpenModal ] = useState(false);
  const [ intervalVar, setIntervalVar ] = useState(null)

  const handleClicsCards = (turnedFalse, findedCards, id, idCard) =>{
    setCardsTurned([...cardsTurned, {id, idCard}]);
    cardsTurned = [...cardsTurned, {id, idCard}];
    if(cardsTurned.length == 2){
      if(cardsTurned[0].id == cardsTurned[1].id && cardsTurned[0].idCard != cardsTurned[1].idCard){
        findedCards(id);
        setHits(++hits);
        if(hits == 10){ 
          setWon(true);
          setOpenModal(true);
          clearInterval(intervalVar);
        }
      } else {
        setFails(++fails);
      }
      setCardsTurned([]);
      setTimeout(() => {
        turnedFalse(...cardsTurned);
        cardsTurned = [];
      }, 1700);
    } 
  }

  const handleMoves = () => setMoves(moves + 1);
  const startHandler = () =>{
    const verifyTime = ()=>{
      if(timeSeconds != 59) setTimeSeconds(++timeSeconds) 
        else{
          setTimeMinutes(++timeMinutes);
          timeSeconds=0;
          setTimeSeconds(0);
      };
    }
    if(!start){
      intervalVar = setInterval(() => {
        verifyTime();
      }, 1000);
      setIntervalVar(intervalVar)
      setStart(true);
      start = true;
    }
  }
  
  const newGame = (setTryData, tryData) =>{
    setTryData(++tryData);
    setMoves(0);
    setStart(false);
    setTimeSeconds(0);
    setTimeMinutes(0);
    setCardsTurned([]);
    setHits(0);
    setFails(0);
    setWon(false);
    clearInterval(intervalVar);
  }

  return{
    hits,
    fails,
    handleClicsCards,
    handleMoves,
    startHandler,
    newGame,
    moves, 
    timeSeconds,
    timeMinutes,
    won,
    setWon,
    openModal,
    setOpenModal,
  }
}

export default useStartGame;