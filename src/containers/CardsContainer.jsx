import useGetData from '@hooks/useGetData';
import Item from '@components/Item';
import useStartGame from '@hooks/useStartGame';
import { motion } from 'framer-motion';
import { GiAbstract050 as IconPrincipalMenu } from 'react-icons/gi';
import { BiRevision as IconReload } from 'react-icons/bi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import jsCookie from 'js-cookie';

const CardsContainer = ()=>{
  const { characters, 
          turnedCard, 
          turnedFalse, 
          findedCards, 
          tryData, 
          setTryData,
          winData,
          setWinData, } = useGetData();

  const { hits, 
          fails, 
          moves, 
          timeSeconds, 
          timeMinutes, 
          handleClicsCards, 
          handleMoves, 
          startHandler, 
          newGame, 
          openModal, 
          setOpenModal, 
          won,
          wonGame,
          openFinallyModal,
          setOpenFinallyModal, } = useStartGame();

  const router = useRouter();
  const { id } = router.query;

  useEffect(()=>{
    const { id } = router.query;
    const level = jsCookie.get('r&m-level');
    if (!router?.isReady) return;
    if ( level < id  || (!level && id != 1) ){
      router.push('/');
      return;
    }
  }, [router?.isReady])

  const variantsOverlay = {
    show: {
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 1.3
      },
    },
    hidde: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 2.5
      },
    },
  }
  const variantsModal = {
    show: {
      scale: 1,
      rotate: 0,
      transition: {
        ease: "easeInOut",
        duration: 2
      },
    },
    hidde: {
      scale: 0,
      rotate: 180,
      transition: {
        ease: "easeOut",
        duration: 2
      },
    },
  }

  const handleRepeat = () =>{
    newGame();
    setTryData(++tryData);
    setTimeout(()=>{
      setOpenModal(false);
      setOpenFinallyModal(false);
    }, 2500);
  }
  const handleWin = () =>{
    router.events.on('routeChangeComplete', ()=>{
      newGame();
      setWinData(++winData);
      setTimeout(()=>{
        setOpenModal(false);
        setOpenFinallyModal(false);
      }, 2500);
    })   
  }

  return(
    <>
      {
        characters?.length > 0 ? <>
        <div className="container bg-[url('../assets/images/background-game.jpg')] bg-[length:370%_140%] md:bg-[length:160%_140%] bg-bottom flex flex-col min-h-screen lg:w-full max-w-full justify-center items-center m-0">
          <div className='cont-level select-none md:w-5/6 w-11/12 m-4 flex justify-center items-center bg-yellow-300/80 rounded-lg'>
            <span className='text-4xl py-3 font-macondo tracking-[2px] font-black'>
              Nivel {id}
            </span>
          </div>
          <div className="cards-content flex flex-wrap xl:gap-8 gap-4 justify-center bg-gradient-to-r from-lime-500/40 to-cyan-500/40 min-h-min md:max-w-screen-sm xl:max-w-screen-lg rounded-xl md:p-6 py-6 px-2 m-4 select-none">
            { characters?.map(character =>{
              return <Item 
              key={character.key}
              turned={character.turned} 
              id={character.id}
              idCard={character.idCard}
              image={character.image}
              order={character.order} 
              turnedCard={turnedCard}
              turnedFalse={turnedFalse}
              findedCards={findedCards}
              handleClicsCards={handleClicsCards}
              handleMoves={handleMoves}
              startHandler={startHandler}  />

            })}
          </div>
          <div className="panel font-padauk text-white flex flex-col md:flex-row md:flex-wrap gap-4 w-4/5 py-6 px-4 my-4 md:py-4 text-xl justify-center md:justify-around items-center bg-black/60 rounded-l font-bold select-none" >
           <div className='w-40 text-center md:text-left'>Movimientos:  <span className="font-black">{moves}</span></div> 
           <div className='w-32 text-center md:text-left'><span className='text-lime-500'>Aciertos:</span> { hits }</div>
           <div className='w-32 text-center md:text-left'><span className='text-red-400'>Fallos:</span> { fails }</div>
           <div className="text-center w-24 text-center md:text-left">{timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes}:{timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds}</div> 
           <button 
            className="font-indiFlower font-bold bg-yellow-400 hover:bg-yellow-300 transition-colors  text-black rounded-l py-2 px-5 md:py-1"
            onClick={ () =>{ 
              newGame();
              setTryData(++tryData);
            }} >
              Juego Nuevo
            </button> 
            <Link href="/">
              <button 
              className="font-indiFlower font-bold bg-pink-600 hover:bg-pink-500 transition-colors  text-black rounded-l py-2 px-5 md:py-1"
              onClick={ () =>{ 
                newGame();
                setTryData(++tryData);
              }} >
                Volver al Menu
              </button>
            </Link> 
          </div>
        </div> 
        </> : null 
      }
      {
        openModal ? <motion.div  initial={{ opacity: 0 }} variants={variantsOverlay} animate={ won ? "show" : "hidde"} className="modal-overlay w-screen h-screen bg-black/70 fixed top-0 left-0 flex">
          <motion.div initial={{ rotate: 180, scale: 0, }}  variants={variantsModal} animate={ won ? "show" : "hidde"} className="modal m-auto md:max-w-3xl md:w-4/5 md:h-96 h-3/5 bg-[url('../assets/images/modal.png')] bg-cover border-4 border-rose-700">
            <div className='w-full h-full backdrop-brightness-75 backdrop-saturate-150 bg-white/50  flex justify-center items-center'>
              <div className='over-background w-11/12 h-5/6 bg-black/90 px-9  flex justify-center flex-col items-center'>
                <span className='font-san text-xl md:text-3xl lg:text-5xl pt-6 pb-8 w-11/12 text-center bg-white/90 rounded-md text-rose-700'>¡Nivel Completado!</span>
                <div className='options flex flex-wrap justify-between w-5/6 mt-12 text-md lg:text-lg'>
                  <Link href='/'>
                    <button className='bg-white/60 hover:bg-white/80 active:bg-white/70 px-5 py-2 rounded-lg lg:mx-5 mb-7' onClick={()=> handleRepeat()}>
                      <IconPrincipalMenu 
                        className='text-purple-900 text-2xl lg:text-2xl'
                      />
                    </button>
                  </Link>
                  <button 
                    className='bg-white/60 hover:bg-white/80 active:bg-white/70 md:ml-6 px-5 py-2 rounded-lg lg:mx-5 mb-7'
                    onClick={()=> handleRepeat()} >
                    <IconReload 
                      className='text-green-700 text-2xl lg:text-2xl'
                    />
                  </button>
                  <Link href={`/levels/${parseInt(id) + 1}`}>
                  <button 
                    className='bg-white/60 hover:bg-white/80 active:bg-white/70 px-5 py-2 rounded-lg mb-7 ml-auto mr-2'
                    onClick={()=> handleWin()} >
                      <span
                        className='text-pink-700 font-extrabold' >
                        Siguiente Nivel
                      </span>
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div> : null
      }
      {
        openFinallyModal ? <motion.div initial={{ opacity: 0 }} variants={variantsOverlay} animate={ wonGame ? "show" : "hidde"} className='overlay-finally-game w-screen h-screen fixed top-0 left-0 bg-black/70 flex justify-center items-center'>
          <motion.div initial={{ rotate: 180, scale: 0, }}  variants={variantsModal} animate={ wonGame ? "show" : "hidde"} className="modal-finally bg-[url('../assets/images/modal-2.png')] md:max-w-3xl md:w-4/5 md:h-96 h-3/5  md:bg-cover bg-[length:170%_100%] bg-center border-4 border-rose-700 flex flex-wrap justify-center items-center">
            <span className='font-san text-xl md:text-3xl lg:text-5xl pt-6 pb-8 w-11/12 text-center bg-white/90 rounded-md text-rose-700'>¡Has completado todos los niveles!</span>
            <Link href='/'>
              <button className='bg-white/60 hover:bg-white/80 active:bg-white/70 px-5 py-2 rounded-lg lg:mx-5 mb-7'
               onClick={()=> handleRepeat()}>
                <IconPrincipalMenu 
                  className='text-purple-900 text-2xl lg:text-2xl' />
              </button>
            </Link>
            <button 
              className='bg-white/60 hover:bg-white/80 active:bg-white/70 md:ml-6 ml-3 px-5 py-2 rounded-lg lg:mx-5 mb-7'
              onClick={()=> handleRepeat()} >
                <IconReload 
                  className='text-green-700 text-2xl lg:text-2xl' />
            </button>
          </motion.div>
        </motion.div> : null
      }
    </>
  );
};

export default CardsContainer;