import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import Login from './login';
import loginReducer from '../reducers/login';

const rootReducer = combineReducers({
  login: loginReducer
})

const setupStore = preloadedState => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

const store = setupStore({});

describe("Login tests", () => {
    
    test("Test visual, inputs enabled", () => {
      render(<Provider store={store}><Login/></Provider>, {wrapper: BrowserRouter});
      const userInput = screen.getByTestId("username-input");
      const passwordInput = screen.getByTestId("password-input");
      expect(userInput).toBeInTheDocument();
      expect(passwordInput).not.toBeDisabled();
    });

    test("Submit button disabled as long as one or both inputs are empty", () => {
      render(<Provider store={store}><Login/></Provider>, {wrapper: BrowserRouter});      
      const submitButton = screen.getByText("Log In");      
      expect(submitButton).toBeDisabled();
    });

    test("Submit button enabled when both inputs not empty", () => {
      render(<Provider store={store}><Login/></Provider>, {wrapper: BrowserRouter});      
      const userInput = screen.getByTestId("username-input");
      const passwordInput = screen.getByTestId("password-input");
      fireEvent.change(userInput, {target: {value: "johndoe"}});
      fireEvent.change(passwordInput, {target: {value: "secretpassword"}});
      const submitButton = screen.getByText("Log In");      
      expect(submitButton).not.toBeDisabled();
    });

    xtest("Route change after successfull submit", async () => {
      render(<MemoryRouter initialEntries={["/"]}><Provider store={store}><Login/></Provider></MemoryRouter>);      
      const userInput = screen.getByTestId("username-input");
      const passwordInput = screen.getByTestId("password-input");
      fireEvent.change(userInput, {target: {value: "johndoe"}});
      fireEvent.change(passwordInput, {target: {value: "789"}}); // you would not do this in production
      const submitButton = screen.getByText("Log In");       
      fireEvent.click(submitButton);      
      const dashboardText= await screen.findByText("Dashboard");          
      expect(dashboardText).toBeInTheDocument();      
    });

    test("Snapshot test", async () => {
      const component = render(<Provider store={store}><Login/></Provider>, {wrapper: BrowserRouter});      
      expect(component).toMatchSnapshot();
    });
});