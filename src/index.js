import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Tictactoe from './components/Tictactoe'
import App from './components/App';
// import AppClass from './components/AppClass';
import reportWebVitals from './reportWebVitals';
  
// ========================================

ReactDOM.render(
    <React.StrictMode>
        {/* <Tictactoe /> */}
        <App />
        {/* <AppClass/> */}
    </React.StrictMode>,
    document.getElementById('root')
);


reportWebVitals();
