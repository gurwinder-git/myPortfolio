import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//react router
import { BrowserRouter } from 'react-router-dom';

//react-redux
import { Provider } from 'react-redux'

//redux
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

//reducers
import adminProjectsReducer from './store/reducers/adminProjectsReducer'

//redux-thunk
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  adminProjects: adminProjectsReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode >,
  document.getElementById('root')
);
