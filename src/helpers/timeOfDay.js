import React from 'react';
import {
  MORNING,
  AFTERNOON,
  SUNSET,
  NIGHT
} from 'app-constants';

/**
 * Get the time of the day
 *
 * @return {String} Time of the day
 */
function getTimeOfDay() {
  const hourOfDay = (new Date()).getHours();

  if (hourOfDay >= 6 && hourOfDay < 12) {
    return MORNING;
  } else if (hourOfDay >= 12 && hourOfDay < 17) {
    return AFTERNOON;
  } else if (hourOfDay >= 17 && hourOfDay < 19) {
    return SUNSET;
  }

  return NIGHT;
}

export default function useStateTimeOfDay() {
  const [timeOfDay, setTimeOfDay] = React.useState(getTimeOfDay());

  React.useEffect(() => {
    let interval = window.setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 1000);

    return function cleanup() {
      window.clearInterval(interval);
    }
  }, [timeOfDay, setTimeOfDay]);

  return [timeOfDay, setTimeOfDay];
}
