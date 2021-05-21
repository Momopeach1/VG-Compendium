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
        marginLeft: 'auto',
        '&:hover' : {
          backgroundColor: fade('#3f51b5', 0.75),
        }
      },
});

const Header = ({history}) => {
    const classes = useStyles();
    return (
        <div className='header'>
            <Button
              className={classes.button}
              onClick={()=> history.push('/signup')}
              >
              Signup
            </Button>
        </div>
    )
}

export default withRouter(Header);