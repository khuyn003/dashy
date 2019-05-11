import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Background from 'components/Background';
import getGreeting from 'helpers/greeting';
import getTimeOfDay from 'helpers/timeOfDay';
import useStateWithLocalStorage from 'helpers/localStorage';
import { LOCAL_STORAGE_USERNAME } from 'app-constants';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  position: relative;

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
`

export default function Layout({ children }) {
  const [username] = useStateWithLocalStorage(LOCAL_STORAGE_USERNAME);

  return (
    <React.Fragment>
      <Helmet title={username ? `${getGreeting(username, getTimeOfDay())} | Dashy` : 'Dashy'} />
      <Background />
      <Container>
        <Wrapper>
          {children}
        </Wrapper>
      </Container>
    </React.Fragment>
  );
};
