import React from 'react';
import styled from 'styled-components';

import getGreeting from 'helpers/greeting';

const Wrapper = styled.h1`
  color: #fff;
  font-size: 55px;
  font-weight: 500;
  text-align: center;
  text-shadow: 0 1px 5px rgba(0, 0, 0, .3);
  margin: 0;
`;

export default function Greeting({ className, username, timeOfDay }) {
  return (
    <Wrapper className={className}>
      { getGreeting(username, timeOfDay) }
    </Wrapper>
  );
}
