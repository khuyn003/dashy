import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Background from 'containers/Background';
import getGreeting from 'helpers/greeting';
import useStateTimeOfDay from 'helpers/timeOfDay';
import useStateWithLocalStorage from 'helpers/localStorage';
import { LOCAL_STORAGE_USERNAME } from 'app-constants';

const Container = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .25) 0%,rgba(0, 0, 0, 0) 100%);
  }
`;

const Wrapper = styled.div`
  position: relative;
  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 700ms ease-in;
`

export default function Layout({ children }) {
  const [username] = useStateWithLocalStorage(LOCAL_STORAGE_USERNAME);
  const [isVisible, setIsVisible] = useState(false);
  const [timeOfDay] = useStateTimeOfDay();

  useEffect(() => {
    window.setTimeout(() => {
      setIsVisible(true);
    }, 200);
  });

  return (
    <>
      <Helmet title={username ? `${getGreeting(username, timeOfDay)} | Dashy` : 'Dashy'} />
      <Background />
      <Container>
        <Wrapper isVisible={isVisible}>
          {children}
        </Wrapper>
      </Container>
    </>
  );
};
