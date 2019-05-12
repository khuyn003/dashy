import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useStateWithLocalStorage from 'helpers/localStorage';
import getTimeOfDay from 'helpers/timeOfDay';
import {
  MORNING,
  AFTERNOON,
  SUNSET,
  NIGHT
} from 'app-constants';

const collectionIds = {
  [MORNING]: 3313547,
  [AFTERNOON]: 4798389,
  [SUNSET]: 4798397,
  [NIGHT]: 4798403
}

function fetchBgImgUrl(timeOfDay) {
  const collectionId = collectionIds[timeOfDay];
  // Always pull the largest image a user's monitor can support
  const imageSize = `${window.screen.availWidth}x${window.screen.availHeight}`;

  // Fetch a random photo from a collection
  // source: https://source.unsplash.com/
  return fetch(`https://source.unsplash.com/collection/${collectionId}/${imageSize}`)
    .then((res) => res.blob())
    .then(blob => new Promise((resolve, reject) => {
      // base64 encode image
      // https://stackoverflow.com/a/20285053
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }))
    .then(dataUrl => {
      // cache base64 encoded image to local storage.
      // can now be used offline
      return dataUrl;
    })
    .catch(error => console.error(error))
  ;
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  ${props => props.bgImgUrl && `
    background: url(${props.bgImgUrl}) center / cover no-repeat;
  `}

  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 250ms ease-in-out;
`;

const getCurrentDay = () => '' + (new Date()).getDay();

export default function Background({ className }) {
  const [currentDay, setCurrentDay] = useState(getCurrentDay());
  const [timeOfDay, setTimeOfDay] = useState(getTimeOfDay());
  const [bgImgUrl, setBgImgUrl] = useStateWithLocalStorage(`background_${timeOfDay}_url`);
  const [bgImgDay, setBgImgDay] = useStateWithLocalStorage(`background_${timeOfDay}_day`);
  // show if there's a background image from today, else hide until we've fetched
  // a new one
  const [isVisible, setIsVisible] = useState(!!bgImgUrl && bgImgDay === currentDay);

  useEffect(() => {
    async function fetchNewBackground() {
      const newBgImgUrl = await fetchBgImgUrl(timeOfDay);

      setBgImgUrl(newBgImgUrl);
      setBgImgDay(currentDay);
      setIsVisible(true);
    }

    // if no img found or it's a stale image, fetch a new one
    if (!bgImgUrl || bgImgDay !== currentDay) {
      fetchNewBackground();
    }
  }, [setBgImgUrl, bgImgUrl, bgImgDay, setBgImgDay, timeOfDay, currentDay]);

  useEffect(() => {
    // update every minute to trigger background refresh if needed
    let interval = window.setInterval(() => {
      setCurrentDay(getCurrentDay());
      setTimeOfDay(getTimeOfDay());
    }, 60000);

    return function cleanup() {
      window.clearInterval(interval);
    }
  });

  return (
    <Container
      className={className}
      isVisible={isVisible}
      bgImgUrl={bgImgUrl}
    />
  )
}
