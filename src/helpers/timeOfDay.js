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
export default function getTimeOfDay() {
  const hourOfDay = (new Date()).getHours();

  if (hourOfDay >= 6 && hourOfDay < 12) {
    return MORNING;
  } else if (hourOfDay >= 12 && hourOfDay < 15) {
    return AFTERNOON;
  } else if (hourOfDay >= 15 && hourOfDay < 19) {
    return SUNSET;
  }

  return NIGHT;
}
