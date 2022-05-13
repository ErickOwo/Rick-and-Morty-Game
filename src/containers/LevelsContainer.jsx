import LevelItem from "@components/LevelItem";
import { useInterface } from "@hooks/useInterface";

const LevelsContainer = () =>{
  const { pages } = useInterface()
  const levels = [];
  for(let i=1; i < pages; i++){
    levels.push(i);              
  }
  return(
    <>
      <div className="container">
        <div className="content-levels w-5/6 h-5/6 flex justify-center align-center bg-lime-500">
          {
            levels.map(level =>{
              <LevelItem>{ level }</LevelItem>
            })
          }
        </div>
      </div>
    </>
  );
};

export default LevelsContainer;