import React from 'react';
import styled from 'styled-components';

import getGreeting from 'helpers/greeting';

const Wrapper = styled.h1`
  color: #fff;
  flex: 0 0 100%;
  font-size: 55px;
  font-weight: 500;
  text-align: center;
  margin: 0;
`;

export default function Greeting({ className, username, timeOfDay }) {
  return (
    <Wrapper className={className}>
      { getGreeting(username, timeOfDay) }
    </Wrapper>
  );
}
