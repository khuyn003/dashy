import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import getTimeOfDay from 'helpers/timeOfDay';
import useStateWithLocalStorage from 'helpers/localStorage';
import Clock from 'components/Clock';
import Greeting from 'components/Greeting';
import { LOCAL_STORAGE_USERNAME } from 'app-constants';

const StyledClock = styled(Clock)`
  margin: 0 auto;
`;

const Welcome = () => {
  const [username] = useStateWithLocalStorage(LOCAL_STORAGE_USERNAME);

  if (!username) return <Redirect to="/" />;

  return (
    <React.Fragment>
      <StyledClock />
      <Greeting
        username={username}
        timeOfDay={getTimeOfDay()}
      />
    </React.Fragment>
  );
}

export default Welcome;
