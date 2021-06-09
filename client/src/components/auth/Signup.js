import React, { useState } from 'react';
import Navbar from '../Navbar';
import Header from '../Header';
import server from '../../apis/server';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #482861 30%, #6a82ab 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      width: '50%',
      fontSize: '1.2rem',
      marginTop: '10px',
    },
    label: {
      textTransform: 'capitalize',
      fontFamily: 'whitney-book',
    },
    textfield: {
      background: '#b08bb0',
      width: '100%',
      borderRadius: 3,
      marginBottom: '10px',
    },
    heading: {
      fontWeight: 'bold',
      paddingBottom: '30px',
      paddingLeft: '50px',
      paddingTop: '50px',
      fontFamily: 'whitney-book',
      fontSize: '3rem',
      color: 'rgb(50, 53, 59)',
  
    },
    signinButton: {
      height: '48px',
      padding: '0 30px',
      color: '#653987',
      fontSize: '1.2rem',
      fontFamily: 'whitney-book',
      marginLeft: '30px',
    },
    textfieldHeading: {
      color: '#653987',
      fontSize: '1.2rem',
      fontFamily: 'whitney-book',
      paddingBottom: '5px',
    }
  });

const Signup = (props) => {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();
        try{
          await server.post('/user/signup', {email, displayName, password});
          props.history.push('/');
        }
        catch(error){
          setError(error.response.data.error);
          setEmail("");
          setPassword("");
          setDisplayName("");
        };

    };
    
      const onChangeHandler = event => {
        const { id, value } = event.target;
    
        if (id === "userEmail") {
          setEmail(value);
        } else if (id === "userPassword") {
          setPassword(value);
        } else if (id === "displayName") {
          setDisplayName(value);
        }
      };
  
      const onSigninClick = () => {
        props.history.push('/signin');
      };

      const renderError = () => error?
      <Typography classes= {{root: classes.errorMsg}}>
        {error}
      </Typography> : null;

    return (
        <div>
            <form className="registration-form">
                {renderError()}
                  <Typography classes= {{root: classes.textfieldHeading}}>
                    Display Name
                  </Typography>
                  <TextField 
                    required
                    id="displayName"
                    classes={{ root: classes.textfield}}
                    value={displayName}
                    autoComplete="off"
                    variant="outlined"
                    placeholder="Name"
                    onChange={(event) => onChangeHandler(event)}
                  />
                  <Typography classes= {{root: classes.textfieldHeading}}>
                    Email
                  </Typography>
                  <TextField
                    required
                    id="userEmail"
                    classes={{ root: classes.textfield}}
                    value={email}
                    autoComplete="off"
                    placeholder="Email"
                    variant="outlined"
                    onChange={(event) => onChangeHandler(event)}
                  />
                  <Typography classes= {{root: classes.textfieldHeading}}>
                    Password
                  </Typography>
                  <TextField 
                    required
                    id="userPassword"
                    classes={{ root: classes.textfield}}
                    value={password}
                    autoComplete="off"
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    onChange={(event) => onChangeHandler(event)}
                  />
                  <Button 
                  classes={{
                    root: classes.root,
                    label: classes.label,
                  }}
                  onClick = {(event) => {createUserWithEmailAndPasswordHandler(event, email, password)}}
                  >
                    Register
                  </Button>
                  <Button 
                  classes={{
                    root: classes.signinButton,
                    label: classes.label
                  }}
                  onClick={()=> onSigninClick()}
                  >
                    Sign In
                  </Button>
            </form>
        </div>

    );
};

export default withRouter(Signup);