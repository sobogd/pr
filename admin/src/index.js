import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root'),
);

reportWebVitals();
