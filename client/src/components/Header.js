import React from 'react';
import { withRouter } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import '../styles/header.css';

const useStyles = makeStyles({
    button: {
        display: 'block',
        color: '#FFF',
        backgroundColor: '#3f51b5',
        fontWeight: '600',
        textTransform: 'none',
        height:'auto',
        marginLeft: '10px',
        '&:hover' : {
          backgroundColor: fade('#3f51b5', 0.75),
        }
      },
    inverseButton: {
      display: 'block',
      color: '#3f51b5',
      backgroundColor: '#FFF',
      fontWeight: '600',
      textTransform: 'none',
      height:'auto',
      marginLeft: '10px',
      border: 'solid 1px',
      '&:hover' : {
        backgroundColor: fade('#3f51b5', 0.25),
      }
    },
});

const Header = ({history}) => {
  
    const classes = useStyles();
    return (
        <div className='header'>
          <div className='header-buttons'>
            <Button
              className={classes.inverseButton}
              onClick={()=> history.push('/login')}
            >
              Login
            </Button>
            <Button
              className={classes.button}
              onClick={()=> history.push('/signup')}
              >
              Signup
            </Button>
          </div>
        </div>
    )
}

export default withRouter(Header);