import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import '@testing-library/jest-dom';
import { _getUsers, _getQuestions } from '../_DATA';
import Dashboard from './dashboard';
import loginReducer from '../reducers/login';
import pollReducer from '../reducers/poll';

let authUser = null;
let questions = [];

beforeEach(async () => {
  const users = await _getUsers();
  authUser = users["johndoe"]; 
  const questionsObject = await _getQuestions();
  questions = Object.values(questionsObject);
});

const rootReducer = combineReducers({
  login: loginReducer,
  poll: pollReducer
})

const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

describe("Dashboard component tests", () => {
    
    test("Test links exist", () => {
      const store = setupStore({login: {authenticatedUser: authUser}, poll: { questions }});
      render(<Provider store={store}><Dashboard /></Provider>, {wrapper: BrowserRouter});
      waitFor( () => {      
        const openQuestions = document.querySelector("#open-questions-tab-pane");
        const tableRows = openQuestions.querySelectorAll("tr");
        expect(tableRows.length).toBe(3);
      }, {timeout: 2000});
    });

});