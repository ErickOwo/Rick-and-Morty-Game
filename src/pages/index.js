import Image from 'next/image';
import logo from '@images/rick-and-morty-logo-1.png';
import { useInterface } from '@hooks/useInterface';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import { motion } from 'framer-motion';

export default function Home() {
  const { level, toggleMode, setToggleMode, hardMode, setHardMode, modalCookies, setModalCookies, acceptCookies, setAcceptCookies } = useInterface();

  const variantsOverlay = {
    show: {
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 1.3,
      },
    },
    hidde: {
      opacity: 0,
      transition: {
        ease: 'easeOut',
        duration: 2,
      },
    },
  };
  const variantsModal = {
    show: {
      scale: 1,
      transition: {
        ease: 'easeInOut',
        duration: 2,
      },
    },
    hidde: {
      scale: 0,
      transition: {
        ease: 'easeOut',
        duration: 1.5,
      },
    },
  };

  return (
    <>
      <div className="container h-screen w-full min-w-none max-w-none min-h-none bg-[url('../assets/images/principal-background.jpg')] bg-[length:210%_100%] md:bg-[length:110%_100%] bg-center flex justify-center items-center select-none">
        <div className="flex flex-col justify-center items-center h-4/6 md:h-fit bg-black/80 px-3 md:px-16 xl:px-32 relative">
          <button
            onClick={() => setToggleMode(!toggleMode)}
            className="font-padauk text-lg m-3 py-1 px-4 bg-black/80 text-cyan-200 absolute top-0 left-0 border border-gray-900/80 hover:text-cyan-100 hover:bg-black/60 hover:border-gray-900/90"
          >
            Modo
          </button>
          {toggleMode ? (
            <div className="bg-black/90 absolute flex flex-col top-0 left-0 z-30 ml-3 mt-[51px] border-l border-white">
              <button
                onClick={() => {
                  setHardMode('false');
                  jsCookie.set('r&m-hard-mode', 'false', { expires: 200 });
                }}
                className={hardMode == 'true' ? `text-lg text-white/70 pl-2 pr-10 py-2 bg-black hover:text-white/90` : `text-lg text-cyan-500/70 pl-2 pr-10 py-2 bg-gray-900 hover:text-white/90`}
              >
                Normal
              </button>
              <button
                onClick={() => {
                  setHardMode('true');
                  jsCookie.set('r&m-hard-mode', 'true', { expires: 200 });
                }}
                className={hardMode == 'true' ? `text-lg text-cyan-500/70 pl-2 pr-10 py-2 bg-gray-900 hover:text-white/90` : `text-lg text-white/70 pl-2 pr-10 py-2 bg-black hover:text-white/90`}
              >
                Difícil
              </button>
            </div>
          ) : null}
          <Image src={logo} width="550px" height="220px" />
          <span className="text-yellow-200 text-2xl md:text-5xl mb-6 font-bold font-ebGaramond tracking-[3px]">App Game</span>
          <Link href={level ? `/levels/${level}` : '/levels/1'}>
            <button
              onClick={() => setToggleMode(false)}
              className="bg-black/80 border border-gray-900 text-cyan-500 text-3xl font-bold py-2 px-5 mt-4 font-stacker tracking-wider hover:bg-black/70 hover:border-gray-900/80 font-robotoFlex"
            >
              Comenzar
            </button>
          </Link>
          <Link href="/">
            <button
              onClick={() => {
                setToggleMode(false);
              }}
              className="text-2xl text-yellow-400 font-bold mt-4 mb-8 tracking-wider hover:text-yellow-300 font-padauk"
            >
              Niveles
            </button>
          </Link>
        </div>
      </div>
      {modalCookies ? (
        <motion.div
          initial={{ opacity: 0 }}
          variants={variantsOverlay}
          animate={!acceptCookies ? 'show' : 'hidde'}
          className="modal-overlay w-screen h-screen fixed top-0 left-0 bg-white/40 flex justify-center items-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            variants={variantsModal}
            animate={!acceptCookies ? 'show' : 'hidde'}
            className="modal md:w-5/6 md:h-3/6 h-4/6 bg-black/90 flex flex-col justify-center items-center"
          >
            <h4 className="info text-white font-bold text-2xl mb-2">Uso de cookies.</h4>
            <p className="info-text text-white text-lg text-center">Estamos usando cookies propias para mejorar la interfaz de usuario.</p>
            <button
              onClick={() => {
                jsCookie.set('r&m-accept-cookies', true, { expires: 200 });
                setAcceptCookies(true);
                setTimeout(() => {
                  setModalCookies(false);
                }, 2000);
              }}
              className="bg-white hover:bg-white/80 rounded-md py-2 px-6 text-cyan-600 text-2xl mt-8"
            >
              Aceptar
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
}
