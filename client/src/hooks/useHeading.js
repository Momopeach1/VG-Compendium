import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom'
import UserContext from '../contexts/UserContext';

const useHeading = () => {
  const [heading, setHeading] = useState('Welcome to VG Compenduim!');
  const { isAuth } = useContext(UserContext);
  let location = useLocation();
  
  useEffect(() => {
    switch(location.pathname){
      default:
        setHeading('Welcome to VG Compenduim!');
        break;
      case '/login':
        setHeading('Log In');
        break;
      case '/signup':
        setHeading('Sign Up');
        break;
      case '/':
        if(isAuth) setHeading('My Panel');
        else setHeading('Welcome to VG Compenduim!');
        break;
    }
  }, [location, isAuth]);

  return [heading, setHeading];
}

export default useHeading;