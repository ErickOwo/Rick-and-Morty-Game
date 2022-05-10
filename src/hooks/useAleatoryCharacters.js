import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const useAleatoryCharacters = async API =>{
  const createRandom = sup => parseInt(Math.random() * sup + 1);

  const aleatories = [];
  const characters = [];
  
  const response = await axios(API);
  const data = response.data.results;

  while(aleatories.length != 10){ 
    const num = createRandom(data?.length);
    if(!aleatories.some(aleatory => aleatory == num)) aleatories.push(num);
  }
  
    if(!isNaN(aleatories[0])){
      for(const aleatory of aleatories){
        const characterRequest = await axios(`${API}/${aleatory}`);
        const character = characterRequest.data;
        character.key = uuidv4();
        character.idCard = uuidv4();
        character.order = createRandom(12);
        character.turned = false;
        character.finded = false;
        characters.push(character);
      }
    }
    if(!isNaN(aleatories[0])){
      for(const aleatory of aleatories){
        const characterRequest = await axios(`${API}/${aleatory}`);
        const character = characterRequest.data;
        character.key = uuidv4();
        character.idCard = uuidv4();
        character.order = createRandom(12);
        character.turned = false;
        character.finded = false;
        characters.push(character);
      }
    }

  return characters;
};

export default useAleatoryCharacters;