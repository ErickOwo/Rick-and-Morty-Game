import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import jsCookie from "js-cookie";

const useAleatoryCharacters = async (API, level) =>{
  const createRandom = (inf, sup) => parseInt(Math.random() * sup + inf);
  const hardMode = jsCookie.get('r&m-hard-mode');
  const aleatories = [];
  const characters = [];
  
  const response = await axios(`${API}?page=${level}`);
  const data = response.data.results;

  while(aleatories.length != 10){ 
    const num = createRandom(data[0].id, data[data.length - 1].id);
    if(!aleatories.some(aleatory => aleatory == num)) aleatories.push(num);
  }
  
  if(hardMode == "true") {
    for(let i = data[0].id; i <= data[data.length - 1].id; i++){
      const characterRequest = await axios(`${API}/${i}`);
      const character = characterRequest.data;
      character.key = uuidv4();
      character.idCard = uuidv4();
      character.order = createRandom(1, 12);
      character.turned = false;
      character.finded = false;
      characters.push(character);
    }
    for(let i = data[0].id; i <= data[data.length - 1].id; i++){
      const characterRequest = await axios(`${API}/${i}`);
      const character = characterRequest.data;
      character.key = uuidv4();
      character.idCard = uuidv4();
      character.order = createRandom(1, 12);
      character.turned = false;
      character.finded = false;
      characters.push(character);
    }
  } else {  
    if(!isNaN(aleatories[0])){
      for(const aleatory of aleatories){
        const characterRequest = await axios(`${API}/${aleatory}`);
        const character = characterRequest.data;
        character.key = uuidv4();
        character.idCard = uuidv4();
        character.order = createRandom(1, 12);
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
        character.order = createRandom(1, 12);
        character.turned = false;
        character.finded = false;
        characters.push(character);
      }
    }
  }

  return characters;
};

export default useAleatoryCharacters;