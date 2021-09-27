import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//react router
import { BrowserRouter } from 'react-router-dom';

//react-redux
import { Provider } from 'react-redux'

//redux
import { createStore, combineReducers } from 'redux'

//reducers
import adminProjectsReducer from './store/reducers/adminProjectsReducer'


const rootReducer = combineReducers({
  adminProjects: adminProjectsReducer
})

const store = createStore(rootReducer)

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
