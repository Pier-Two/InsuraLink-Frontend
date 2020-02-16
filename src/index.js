import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from "react-router-dom";

// A function that routes the user to the right place
// after login
/*const onRedirectCallback = appState => {
  window.history.replaceState(
    {},
    document.title,
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};*/

/** Define Color Theme Here */
const theme = createMuiTheme({
  palette: {
    background: {
      default: '#e6e3e3'
    },
    primary: {
      main: '#e6e3e3',
    },
    secondary: {
      main: '#000000',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: '"Work Sans", serif',
  },
});

ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </BrowserRouter >,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
