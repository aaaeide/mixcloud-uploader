import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    flexDirection: 'row-reverse',
    padding: '0 2em',
  },
});

interface NavbarProps {
  login: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ login }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position='sticky'>
      <Toolbar>
        <Button onClick={login} color='inherit'>
          Logg inn på Mixcloud
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
