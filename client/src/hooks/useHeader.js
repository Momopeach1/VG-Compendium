import { useContext, useEffect } from 'react';
import server from '../apis/server';

import UserContext from '../contexts/UserContext';

const useHeader = () => {
  const { isAuth, user, setIsAuth } = useContext(UserContext);
  
  useEffect(() => {
    console.log(isAuth);
	}, [isAuth]);

  const logOut = () =>{
    server.post('user/logout')
    .then(response =>{
      setIsAuth(false);
    })
  }

  const renderLoggedIn = () =>{
    return(
      <div>
        <h1>hello {user.displayName} </h1>
        <div onClick={logOut}>Logout</div>
      </div>
    )
  };
  return [renderLoggedIn];
}

export default useHeader;