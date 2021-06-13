import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import server from '../apis/server';

import UserContext from '../contexts/UserContext';

const useHeader = () => {
  const history = useHistory();
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

  const renderLogo = () => {
    return(
      <div 
      className= 'header-logo'
      onClick={() => history.push('/')}
      >
        VG Compendium
      </div>
    )
  }

  const renderLoggedIn = () =>{
    return(
      <div className='header'>
        {renderLogo}
        <h1>hello {user.displayName} </h1>
        <div onClick={logOut}>Logout</div>
      </div>
    )
  };
  return [renderLoggedIn, renderLogo];
}

export default useHeader;