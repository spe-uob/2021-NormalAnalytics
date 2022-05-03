// __tests__/welcome-page.js
import { getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

import WelcomePage from '../src/components/WelcomePage/WelcomePage'
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Attendance from './components/Attendance/Attendance';
import Student from './components/Student/Student';


test('welcome page - basic test ', () => {

  const wrapper = render(<BrowserRouter><WelcomePage /></BrowserRouter>);
        expect(wrapper.getByRole('link')).toHaveTextContent('Sign In');
      
})

test('welcome page - basic test functionality ', () => {

  const wrapper = render(<BrowserRouter><WelcomePage /></BrowserRouter>);
    expect(wrapper.getByRole('link')).toBeEnabled;

})

test('login page - basic test input ', async () => {

  const username = "username";
  const password = "password";
  const mockLogin = jest.fn();

  render(<BrowserRouter><Login onClick={mockLogin(username, password)}/></BrowserRouter>);
 
  const usernameInput = screen.getByRole('textbox', { name: /Name/i });
  userEvent.type(usernameInput, 'username');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  userEvent.type( passwordInput, 'password');
  const loginButton = screen.getByRole('button', { name: /^Log In$/i });
  

  userEvent.click(loginButton);

  // ASSERT
  await expect(mockLogin).toHaveBeenCalled();
  await expect(mockLogin).toHaveBeenCalledTimes(1);
  
});

test('welcome page - basic test functionality ', () => {

  const wrapper = render(<BrowserRouter><WelcomePage /></BrowserRouter>);
    expect(wrapper.getByRole('link')).toBeEnabled;

})

test('login page - basic test functionality ', async () => {

  const username = "username";
  const password = "password";
  const mockLogin = jest.fn();

  render(<BrowserRouter><Login onClick={mockLogin(username, password)}/></BrowserRouter>);
 
  const usernameInput = screen.getByRole('textbox', { name: /Name/i });
  userEvent.type(usernameInput, 'username');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  userEvent.type( passwordInput, 'password');
  const loginButton = screen.getByRole('button', { name: /^Log In$/i });
  

  userEvent.click(loginButton);

  // ASSERT
  
  await expect(mockLogin).toHaveBeenCalledWith("username", "password");
});

