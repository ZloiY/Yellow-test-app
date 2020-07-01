import React from 'react';
import { withRouter } from 'react-router-dom';
import './login.component.css';
import { TOKEN_URL, JOG_LIST_ROUTE, TOKEN_LOCATION } from '../contants';
import bearFace from '../assets/bear-face.svg';
import pinkBearFace from '../assets/bear-face-pink.svg';

export const fetchToken = () => fetch(
  TOKEN_URL, {
    method: 'POST',
    cors: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodeURI('uuid=hello')
  })
  .then((response) => response.json())
  .then((response) => response.response)
  .then((response) => localStorage.setItem(TOKEN_LOCATION,
    `${response['token_type']} ${response['access_token']}`));


const LoginComponent = ({ history, ...props }) => {

  const onLogin = () => fetchToken()
    .then(history.push(JOG_LIST_ROUTE))
    .then(() => props.onLogin(!!localStorage.getItem(TOKEN_LOCATION)));

  return (
    <div className='layout'>
      <div className='login-container'>
        <img className='desktop-face' src={bearFace} alt=''/>
        <img className='mobile-face' src={pinkBearFace} alt=''/>
        <button className='login-btn' onClick={onLogin}>Let me in</button>
      </div>
    </div>
  );
};

export const Login = withRouter(LoginComponent);
