import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useStateContext } from '../../../../lib/context';

const backendUrl = 'http://192.168.20.230:1337';
console.log('backendUrl', backendUrl)
const LoginRedirect = props => {
  const router = useRouter();
  const [text, setText] = useState('Loading...');
  const queryString = router.asPath.split('?')[1];
  const redirectUrl = `${backendUrl}/api/auth/cognito/callback?${queryString}`;
  console.log(router.query);
  fetch(redirectUrl)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
      }
      return res;
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      localStorage.setItem('jwt', res.jwt);
      localStorage.setItem('username', res.user.username);
      localStorage.setItem('userId', res.user.id);
      localStorage.setItem('email', res.user.email);
      setText('You have been successfully logged in. You will be redirected in a few seconds...');
      setTimeout(() => window.location.href = '/', 2000);
    })
    .catch(err => {
      console.log(err);
      setText('An error occurred, please see the developer console.');
    });

  return <p>{text}</p>;
};

export default LoginRedirect;
