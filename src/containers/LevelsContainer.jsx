import LevelItem from "@components/LevelItem";
import {  useEffect, useState } from "react";
import axios from "axios";
import { useInterface } from "@hooks/useInterface"; 

const LevelsContainer = () =>{
  const { level } = useInterface();

  const [levels, setLevels] = useState([]);
  let [pages, setPages] = useState(42);

  useEffect(()=>{
    
    const makeRequest = async () =>{
      const response = await axios(process.env.NEXT_PUBLIC_API);
      setPages(response.data.info.pages);
    }

    makeRequest();

    for(let i=1; i < pages; i++){
      levels.push(i);              
    }
    setLevels(levels);
  });

  return(
    <>
      <div className="container h-screen min-w-none max-w-none w-screen bg-[url('../assets/images/levels-background.jpg')] bg-center bg-[length:140%_140%] flex justify-center items-center content-start overflow-auto ">
        <div className="content-levels w-5/6 h-5/6 flex flex-wrap gap-3 justify-center items-center bg-lime-500/30">
          {
            levels?.map(level =>(
              <LevelItem key={level}>{ level }</LevelItem>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default LevelsContainer;