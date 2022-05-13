import { useContext, useState, createContext, useEffect } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';

const interfaceContext = createContext();
const API = process.env.NEXT_PUBLIC_API;

export const ProviderInterface = ({ children }) =>{
  const interfaceValue = useProviderInterface();
  return <interfaceContext.Provider value={interfaceValue}>{ children }</interfaceContext.Provider>;
};

export const useInterface = () =>{
  return useContext(interfaceContext);
}

const useProviderInterface = () =>{
  const [ level, setLevel ] = useState(null);
  const [ hardMode, setHardMode ] = useState(false);
  const [ toggleMode, setToggleMode ] = useState(false);
  const [ pages, setPages ] = useState(null);

  useEffect(()=>{
    const fetch = async ()=>{
      const response = await axios(API);
      setPages(response.data.info.pages);
    }

    fetch();

    level = cookie.get('r&m-level');
    setLevel(parseInt(level));
    hardMode = cookie.get('r&m-hard-mode')
    setHardMode(hardMode);
  },[])

  return {
    level, 
    setLevel,
    hardMode,
    setHardMode, 
    toggleMode,
    setToggleMode,
    pages,
  }
}