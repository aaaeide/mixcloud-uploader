import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { AuthObject } from 'state';

const useStyles = makeStyles({
  root: {
    flexDirection: 'row-reverse',
    padding: '0 2em',
  },
});

interface NavbarProps {
  login: () => void;
  authObject: AuthObject | null;
}

const Navbar: React.FC<NavbarProps> = ({ login, authObject }) => {
  const classes = useStyles();
  console.log('navbar recv authovj ', authObject);
  return (
    <AppBar className={classes.root} position='sticky'>
      <Toolbar>
        {authObject === null ? (
          <Button onClick={login} color='inherit'>
            Logg inn på Mixcloud
          </Button>
        ) : (
          `Logget inn som ${authObject.username}`
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
