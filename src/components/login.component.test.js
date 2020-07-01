import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Login } from './login.component';

test('login renders login btn', () => {
  const { getByText } = render(<HashRouter><Login/></HashRouter>);
  const loginBtn = getByText(/Let me in/i);
  expect(loginBtn).toBeInTheDocument();
});