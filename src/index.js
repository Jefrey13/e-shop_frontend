import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import Store from './redux/store'
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode>
//     <App />
//   // </React.StrictMode>
// );
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
    <Provider store={Store}>
      <App />
    </Provider>
);


reportWebVitals();
