import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Background from 'components/Background';
import getGreeting from 'helpers/greeting';
import getTimeOfDay from 'helpers/timeOfDay';
import useStateWithLocalStorage from 'helpers/localStorage';
import { LOCAL_STORAGE_USERNAME } from 'app-constants';

const Container = styled.div`
  height: 100%;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, .25) 0%,rgba(0, 0, 0, 0) 100%);
  }

  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 250ms ease-in-out;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: fit-content;
`

export default function Layout({ children }) {
  const [username] = useStateWithLocalStorage(LOCAL_STORAGE_USERNAME);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.setTimeout(() => {
      setIsVisible(true);
    }, 0);
  });

  return (
    <React.Fragment>
      <Helmet title={username ? `${getGreeting(username, getTimeOfDay())} | Dashy` : 'Dashy'} />
      <Background />
      <Container isVisible={isVisible}>
        <Wrapper>
          {children}
        </Wrapper>
      </Container>
    </React.Fragment>
  );
};
