import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
        light: '#fff',
        main: 'rgb(23, 105, 170)',
        dark: '#000'
    },
    secondary: {
      main: '#f44336',
    },
  }
});

ReactDOM.render(

  <React.StrictMode>
    <MuiThemeProvider theme = { theme }>
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
