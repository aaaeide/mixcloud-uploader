import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import { config } from './config';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App clientId={config.CLIENT_ID} clientSecret={config.CLIENT_SECRET} />
  </ThemeProvider>,
  document.getElementById('root'),
);
