import Image from 'next/image';
import style from '@styles/Order.module.css'
import { motion } from 'framer-motion';

const Item = ({ image, order, id, idCard, turned, turnedCard, turnedFalse, findedCards, handleClicsCards, handleMoves, startHandler })=>{
  const handleClic = () =>{
    if(!turned){
      turnedCard(idCard);
      handleClicsCards(turnedFalse, findedCards, id, idCard);
      handleMoves();
      startHandler();
    };
  }

  const variants = {
    hidden: {
      rotateY: 0,
      transition: {
        ease: "easeInOut",
        duration: 1
      }
    },
    flip: {
      rotateY: 180,
      transition: {
        ease: "easeInOut",
        duration: 1
      }
    }
  };

  return(
    <div 
    className={style[`order-${order}`]} 
    onClick={()=>handleClic()}
    >
      <motion.div 
        className="front relative preserve-3d bg-[url('../assets/images/background-card.jpg')] bg-cover rounded-xl md:w-24 md:h-24 xl:w-28 xl:h-28 w-20 h-20 p-0 flex justify-center items-center cursor-pointer"
        animate={!turned ? 'hidden' : 'flip'}
        variants={variants}  >
        <div className="back backface-hidden negative-rotate-y-180 md:w-24 md:h-24 xl:w-28 xl:h-28 w-20 h-20 p-0 flex justify-center items-center ">
          <Image 
            className="rounded-xl w-full h-full"
            src={image} 
            width='128' 
            height='128' />
        </div>
      </motion.div>
    </div>
  );
};

export default Item;