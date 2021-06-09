import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import server from '../../apis/server';
import UserContext from '../../contexts/UserContext';

import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Navbar from '../Navbar';
import Header from '../Header';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #482861 30%, #6a82ab 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    width: '100%',
    fontSize: '1.2rem',
    marginTop: '10px',
    display: 'block',
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
    paddingRight: '50px',
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
  },
  errorMsg: {
    backgroundColor: '#FAE3E3',
    borderColor: '#B25959',
    borderStyle: 'solid',
    borderWidth: '2px',
    fontSize: '1.4rem',
    fontFamily: 'whitney-book',
    padding: '10px',
    margin: '10px',
    textAlign: 'center',
  }
});

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const classes = useStyles();

  const { setUser, setIsAuth } = useContext(UserContext);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    server.post('/user/login', { email, password })
      .then(response => {
        console.log(response.data);
        setUser(response.data);
        setIsAuth(true);
        console.log('location state', props.location.state);
        const destination = props.location.state? props.location.state.from : '/';
        props.history.push(destination);
      })
      .catch(error => {
        console.log('log in failed', error, error.response);
        if(error.response.data === "Unauthorized") setError("your email or password is incorrect.")
      });
    };
  
  const onChangeHandler = (event) => {
    const {id, value} = event.currentTarget;
    
    if(id === 'userEmail') {
      setEmail(value);
    }
    else if(id === 'userPassword'){
      setPassword(value);
    }
  };

  const renderError = () => error?
  <Typography classes= {{root: classes.errorMsg}}>
    {error}
  </Typography> : null;

    return (
      <div>
          <form className="signin-form">
            {renderError()}
            <Typography classes= {{root: classes.textfieldHeading}}>
              Email
            </Typography>
            <TextField
              required
              id="userEmail"
              classes={{ root: classes.textfield}}
              value={email}
              autoComplete="off"
              variant="outlined"
              placeholder="Email"
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
            <Link to="passwordReset">
              Forgot your password?
            </Link>
            <Button 
            classes={{
              root: classes.root,
              label: classes.label,
            }}
            onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
            >
              Log In
            </Button>
            <p>
              Need an account?{" "}
            <Link to="signup">
              Register
            </Link> 
            </p>
          </form>
      </div>
    );
};

export default withRouter(Login);