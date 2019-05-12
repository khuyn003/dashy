import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useStateWithLocalStorage from 'helpers/localStorage';
import getTimeOfDay from 'helpers/timeOfDay';
import getBackgroundObj from 'helpers/background';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  ${props => props.backgroundImage && `
    background: url(${props.backgroundImage}) center / cover no-repeat;
  `}

  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 250ms ease-in-out;
`;

export default function Background({ className }) {
  const [backgroundObj, setBackgroundObj] = useStateWithLocalStorage(`background_${getTimeOfDay()}`);
  const [isVisible, setIsVisible] = useState(false);
  const { url, day } = (backgroundObj && JSON.parse(backgroundObj)) || {};

  useEffect(() => {
    // if cached data is stale, not from today, get a new image
    if (day !== (new Date()).getDay()) {
      getBackgroundObj(getTimeOfDay(), (obj) => {
        setBackgroundObj(obj);
        setIsVisible(true);
      });
    } else {
      setIsVisible(true);
    }
  }, [backgroundObj])

  return (
    <Container
      className={className}
      isVisible={isVisible}
      backgroundImage={url}
    />
  )
}
