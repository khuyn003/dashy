import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import useStateTimeOfDay from 'helpers/timeOfDay';
import useStateWithLocalStorage from 'helpers/localStorage';
import Clock from 'components/Clock';
import Greeting from 'components/Greeting';
import {
  LOCAL_STORAGE_USERNAME,
  ROUTE_MAIN
} from 'app-constants';

const StyledClock = styled(Clock)`
  margin: 0 auto;
`;

const Welcome = () => {
  const [username] = useStateWithLocalStorage(LOCAL_STORAGE_USERNAME);
  const [timeOfDay] = useStateTimeOfDay();

  if (!username) return <Redirect to={ROUTE_MAIN} />;

  return (
    <React.Fragment>
      <StyledClock />
      <Greeting
        username={username}
        timeOfDay={timeOfDay}
      />
    </React.Fragment>
  );
}

export default Welcome;
