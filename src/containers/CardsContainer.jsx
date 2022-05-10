import useGetData from '@hooks/useGetData';
import Item from '@components/Item';
import useStartGame from '@hooks/useStartGame';
import { motion } from 'framer-motion';
import { GiAbstract050 as IconPrincipalMenu } from 'react-icons/gi';
import { BiRevision as IconReload } from 'react-icons/bi'

const CardsContainer = ()=>{
  const { characters, turnedCard, turnedFalse, findedCards, tryData, setTryData } = useGetData();
  const { hits, fails, moves, timeSeconds, timeMinutes, handleClicsCards, handleMoves, startHandler, newGame, openModal, setOpenModal ,won, setWon } = useStartGame();

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
    setWon(false)
    setTimeout(()=>{
      newGame(setTryData, tryData);
      setOpenModal(false);
    }, 2500);
  }

  return(
    <>
      {
        characters?.length > 0 ? <div className="container bg-[url('../assets/images/fondo.jpg')] bg-[length:370%_140%] md:bg-[length:160%_140%] bg-bottom flex flex-col min-h-screen lg:w-full max-w-full justify-center items-center m-0">
        <div className="cards-content flex flex-wrap  xl:gap-8 gap-4 justify-center bg-gradient-to-r from-lime-500/40 to-cyan-500/40 min-h-min md:max-w-screen-sm xl:max-w-screen-lg  rounded-xl md:p-6 py-6 px-2 m-4 select-none">
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
        <div className="panel text-white flex flex-col md:flex-row md:flex-wrap gap-4 w-4/5 py-6 px-4 my-4 md:py-4 text-xl justify-center md:justify-around items-center bg-black/60 rounded-l font-['Bang'] font-bold select-none" >
           <div>Movimientos:  <span className="font-black">{moves}</span></div> 
           <div><span className='text-lime-500'>Aciertos:</span> { hits }</div>
           <div><span className='text-red-400'>Fallos:</span> { fails }</div>
           <div className="text-center">{timeMinutes < 10 ? `0${timeMinutes}` : timeMinutes}:{timeSeconds < 10 ? `0${timeSeconds}` : timeSeconds}</div> 
           <button 
              className="font-['Bang'] font-bold bg-yellow-400 hover:bg-yellow-300 transition-colors  text-black rounded-l py-2 px-5 md:py-1"
              onClick={ () => newGame(setTryData, tryData) } >
                Juego Nuevo
              </button> 
        </div>
      </div> : null 
      }
      {
        openModal ? <motion.div  initial={{ opacity: 0 }} variants={variantsOverlay} animate={ won ? "show" : "hidde"} className="modal-overlay w-screen h-screen bg-black/70 fixed top-0 left-0 flex">
          <motion.div initial={{ rotate: 180, scale: 0, }}  variants={variantsModal} animate={ won ? "show" : "hidde"} className="modal m-auto md:max-w-3xl md:w-4/5 md:h-96 h-3/5 bg-[url('../assets/images/modal.png')] bg-cover border-4 border-rose-700">
            <div className='w-full h-full backdrop-brightness-75 backdrop-saturate-150 bg-white/50  flex justify-center items-center'>
              <div className='over-background w-11/12 h-5/6 bg-black/90 px-9  flex justify-center flex-col items-center'>
                <span className='font-san text-xl lg:text-5xl pt-6 pb-8 w-11/12 text-center bg-white/90 rounded-md text-rose-700'>¡Nivel Completado!</span>
                <div className='options flex flex-wrap justify-between w-5/6 mt-12 text-md lg:text-lg'>
                  <button className='bg-white/60 hover:bg-white/80 active:bg-white/70 px-5 py-2 rounded-lg lg:mx-5 mb-7'>
                    <IconPrincipalMenu 
                      className='text-purple-900 text-2xl lg:text-2xl'
                    />
                  </button>
                  <button 
                    className='bg-white/60 hover:bg-white/80 active:bg-white/70 px-5 py-2 rounded-lg lg:mx-5 mb-7'
                    onClick={()=> handleRepeat()} >
                    <IconReload 
                      className='text-green-700 text-2xl lg:text-2xl'
                    />
                  </button>
                  <button className='bg-white/60 hover:bg-white/80 active:bg-white/70 px-5 py-2 rounded-lg mb-7 mx-auto'>
                    <span
                      className='text-pink-700 font-extrabold' >
                      Sigiente Nivel
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div> : null
      }
    </>
  );
};

export default CardsContainer;