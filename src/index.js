import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Probit, Bittrex, Bibox, Cashierest } from './service/index';

const probit = new Probit();
const bittrex = new Bittrex();
const bibox = new Bibox();
const cashierest = new Cashierest();

const platforms = { probit, bittrex, bibox, cashierest }

ReactDOM.render(
  <React.StrictMode>
    <App Platforms={platforms} />
  </React.StrictMode>,
  document.getElementById('root')
);
