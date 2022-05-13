import { useContext, useState, createContext, useEffect } from 'react';
import cookie from 'js-cookie';

const interfaceContext = createContext();

export const ProviderInterface = ({ children }) => {
  const interfaceValue = useProviderInterface();
  return <interfaceContext.Provider value={interfaceValue}>{children}</interfaceContext.Provider>;
};

export const useInterface = () => {
  return useContext(interfaceContext);
};

const useProviderInterface = () => {
  const [level, setLevel] = useState(null);
  const [hardMode, setHardMode] = useState(false);
  const [toggleMode, setToggleMode] = useState(false);
  const [modalCookies, setModalCookies] = useState(false);
  const [acceptCookies, setAcceptCookies] = useState(false);

  useEffect(() => {
    level = cookie.get('r&m-level');
    setLevel(parseInt(level));
    hardMode = cookie.get('r&m-hard-mode');
    setHardMode(hardMode);
    acceptCookies = cookie.get('r&m-accept-cookies');
    if (!acceptCookies) setModalCookies(true);
    setAcceptCookies(acceptCookies);
  }, []);

  return {
    level,
    setLevel,
    hardMode,
    setHardMode,
    toggleMode,
    setToggleMode,
    modalCookies,
    setModalCookies,
    acceptCookies,
    setAcceptCookies,
  };
};
