import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  font: 500 170px/1 ${props => props.theme.fonts.primary};
  letter-spacing: -5px;
  color: #fff;
  text-shadow: 0 1px 5px rgba(0, 0, 0, .3);
`;

function getTime() {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  // split into 12 hours
  hours = hours % 12 || 12;

  // prepend a `0` for single digits
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return {
    hours,
    minutes
  };
}

export default function Clock({className}) {
  const [currentTime, setCurrentTime] = useState(getTime());

  const tick = () => {
    setCurrentTime(getTime());
  }

  useEffect(() => {
    let interval = setInterval(tick, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  })

  return (
    <Wrapper className={className}>
      {`${currentTime.hours}:${currentTime.minutes}`}
    </Wrapper>
  );
}
