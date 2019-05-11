import React from 'react';

const STORAGE_PREFIX = 'dashy_';

/**
 * Sync component state to local storage
 *
 * @param  {String} localStorageKey Local storage key name
 *
 * @return {String}                 Local storage value
 */
export default function useStateWithLocalStorage(localStorageKey = '') {
  const [value, setValue] = React.useState(
    localStorage.getItem(`${STORAGE_PREFIX}${localStorageKey}`) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}${localStorageKey}`, value);
  }, [value]);

  return [value, setValue];
};
