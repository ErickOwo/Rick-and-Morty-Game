import { useState } from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useInterface } from './useInterface';

const useStartGame = () => {
  const { hardMode } = useInterface();
  const [moves, setMoves] = useState(0);
  const [start, setStart] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);
  const [timeMinutes, setTimeMinutes] = useState(0);
  const [cardsTurned, setCardsTurned] = useState([]);
  const [hits, setHits] = useState(0);
  const [fails, setFails] = useState(0);
  const [won, setWon] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [wonGame, setWonGame] = useState(false);
  const [openFinallyModal, setOpenFinallyModal] = useState(false);
  const [intervalVar, setIntervalVar] = useState(null);
  const router = useRouter();
  const { id: idRouter } = router.query;
  const { level, setLevel } = useInterface();

  const handleClicsCards = (turnedFalse, findedCards, id, idCard) => {
    setCardsTurned([...cardsTurned, { id, idCard }]);
    cardsTurned = [...cardsTurned, { id, idCard }];
    if (cardsTurned.length == 2) {
      if (cardsTurned[0].id == cardsTurned[1].id && cardsTurned[0].idCard != cardsTurned[1].idCard) {
        findedCards(id);
        setHits(++hits);
        if (hardMode == 'true' ? hits == 20 : hits == 10) {
          if (idRouter == 41) {
            setWonGame(true);
            setOpenFinallyModal(true);
            clearInterval(intervalVar);
          } else {
            setWon(true);
            setOpenModal(true);
            clearInterval(intervalVar);
          }
          if (level == parseInt(idRouter) || !level) {
            cookie.set('r&m-level', parseInt(idRouter) + 1, { expires: 200 });
            setLevel(parseInt(idRouter) + 1);
          }
        }
      } else {
        setFails(++fails);
      }
      setCardsTurned([]);
      setTimeout(() => {
        turnedFalse(...cardsTurned);
        cardsTurned = [];
      }, 1000);
    }
  };

  const handleMoves = () => setMoves(++moves);
  const startHandler = () => {
    const verifyTime = () => {
      if (timeSeconds != 59) setTimeSeconds(++timeSeconds);
      else {
        setTimeMinutes(++timeMinutes);
        timeSeconds = 0;
        setTimeSeconds(timeSeconds);
      }
    };
    if (!start) {
      intervalVar = setInterval(() => {
        verifyTime();
      }, 1000);
      setIntervalVar(intervalVar);
      start = true;
      setStart(start);
    }
  };

  const newGame = () => {
    setMoves(0);
    setStart(false);
    setTimeSeconds(0);
    setTimeMinutes(0);
    setCardsTurned([]);
    setHits(0);
    setFails(0);
    setWon(false);
    setWonGame(false);
    clearInterval(intervalVar);
  };

  return {
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
    wonGame,
    setWonGame,
    openFinallyModal,
    setOpenFinallyModal,
  };
};

export default useStartGame;
