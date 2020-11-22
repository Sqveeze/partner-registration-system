import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'rodal/lib/rodal.css';
import { client } from './lib/apollo';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Store } from './components/Store';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Store>
        <App />
      </Store>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
