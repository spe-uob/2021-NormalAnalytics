// __tests__/welcome-page.js
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom";


import WelcomePage from '../src/components/WelcomePage/WelcomePage'


test('welcome page - basic test ', () => {

  const wrapper = render(<BrowserRouter><WelcomePage /></BrowserRouter>);
        expect(wrapper.getByRole('link')).toHaveTextContent('Sign In');
      
})

test('welcome page - basic test functionality ', () => {

  const wrapper = render(<BrowserRouter><WelcomePage /></BrowserRouter>);
    expect(wrapper.getByRole('link')).toBeEnabled;

      
})