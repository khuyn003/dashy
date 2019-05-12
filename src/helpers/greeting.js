import { GREETINGS } from 'app-constants';

/**
 * Get greeting
 *
 * @param  {String} username  Username
 * @param  {String} timeOfDay Time of day
 *
 * @return {String}           Greeting w/ username
 */
export default function getGreeting(username, timeOfDay) {
  return `${GREETINGS[timeOfDay]}, ${username}.`;
}
