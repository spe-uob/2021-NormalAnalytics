// __tests__/welcome-page.js
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event'


import WelcomePage from '../src/components/WelcomePage/WelcomePage'
import Login from './components/Login/Login';


test('welcome page - basic test ', () => {

  const wrapper = render(<BrowserRouter><WelcomePage /></BrowserRouter>);
        expect(wrapper.getByRole('link')).toHaveTextContent('Sign In');
      
})

test('welcome page - basic test functionality ', () => {

  const wrapper = render(<BrowserRouter><WelcomePage /></BrowserRouter>);
    expect(wrapper.getByRole('link')).toBeEnabled;

})

test('login page - basic test functionality ', async () => {

  const username = "myusername";
  const password = "pass1234";
  const mockLogin = jest.fn();

  render(<BrowserRouter><Login onClick={mockLogin(username, password)}/></BrowserRouter>);
 
  const usernameInput = screen.getByRole('textbox', { name: /Name/i });
  userEvent.type(usernameInput, 'myusername');
  const passwordInput = screen.getByPlaceholderText('Enter your password');
  userEvent.type( passwordInput, 'pass1234');
  const loginButton = screen.getByRole('button', { name: /^Log In$/i });
  

  userEvent.click(loginButton);

  // ASSERT
  await expect(mockLogin).toHaveBeenCalled();
  await expect(mockLogin).toHaveBeenCalledTimes(1);
  await expect(mockLogin).toHaveBeenCalledWith("myusername", "pass1234");
})

