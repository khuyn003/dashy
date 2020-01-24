import React, { useState, useEffect } from 'react';

import Background from 'components/Background';
import useStateWithLocalStorage from 'helpers/localStorage';
import useStateTimeOfDay from 'helpers/timeOfDay';
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
    .catch(error => {
      console.error(error);

      return '';
    })
  ;
};

const getCurrentDay = () => '' + (new Date()).getDay();

export default function BackgroundContainer({ className }) {
  const [timeOfDay] = useStateTimeOfDay();
  const [currentDay, setCurrentDay] = useState(getCurrentDay());
  const [isFetchingBg, setIsFetchingBg] = useState(false);
  const [bgImgUrl, setBgImgUrl] = useStateWithLocalStorage('background_url');
  const [bgImgTimestamp, setBgImgTimestamp] = useStateWithLocalStorage('background_timestamp');
  const currentTimestamp = `${currentDay}_${timeOfDay}`;
  // show if there's a background image from today, else hide until we've fetched
  // a new one
  const [isVisible, setIsVisible] = useState(!!bgImgUrl && bgImgTimestamp === currentTimestamp);

  useEffect(() => {
    async function fetchNewBackground() {
      const newBgImgUrl = await fetchBgImgUrl(timeOfDay);

      if (newBgImgUrl) {
        setBgImgUrl(newBgImgUrl);
        setBgImgTimestamp(currentTimestamp);
      }

      setIsFetchingBg(false);
      setIsVisible(true);
    }

    // if no img found or it's a stale image, fetch a new one
    if (!isFetchingBg && (!bgImgUrl || bgImgUrl === 'undefined' || bgImgTimestamp !== currentTimestamp)) {
      setIsFetchingBg(true);
      setIsVisible(false);
      fetchNewBackground();
    }
  }, [
    setBgImgUrl,
    bgImgUrl,
    bgImgTimestamp,
    setBgImgTimestamp,
    timeOfDay,
    currentTimestamp,
    isFetchingBg
  ]);

  useEffect(() => {
    let interval = window.setInterval(() => {
      setCurrentDay(getCurrentDay());
    }, 1000);

    return function cleanup() {
      window.clearInterval(interval);
    }
  });

  return (
    <Background
      className={className}
      isVisible={isVisible}
      bgImgUrl={bgImgUrl}
    />
  )
}
