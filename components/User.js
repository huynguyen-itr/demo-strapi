import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { useRouter } from 'next/router';

export default function User() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setIsLogged(!!localStorage.getItem('jwt'));
    setUsername(localStorage.getItem('username'));
    setEmail(localStorage.getItem('email'));
  }, []);

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setIsLogged(false);
  };

  const LoginButton = () => {
    const connectCognitoLink = `http://192.168.20.230:1337/api/connect/cognito`;
    return <a href={connectCognitoLink}>
      <button style={{ width: '150px' }}>Connect to cognito</button>
    </a>
  }
    

  const LogoutButton = props => <button onClick={props.onClick}>Logout</button>;

  let buttons = <LoginButton />;
  if (isLogged) {
    buttons = <LogoutButton onClick={logout} />;
  }

  if (!isLogged) {
    return (
    // <div onClick={() => {}}>
    //   <FaUserCircle className="profile" />
    //   <h3>Login with cognito</h3>
    // </div>
      <LoginButton />
    );
  }
  return (
    <Profile>
      <h3 onClick={() => router.push('/order')}>Orders</h3>
      <h3 style={{ padding: '1rem 0 0 0' }}>{email}</h3>
      <LogoutButton onClick={logout} />
    </Profile>
  );
}

const Profile = styled.div`
  img {
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
  }
`;
