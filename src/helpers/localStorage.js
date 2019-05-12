import React from 'react';

const STORAGE_PREFIX = 'dashy_';

/**
 * Sync component state to local storage
 *
 * @param  {String} key  Local storage key name
 *
 * @return {String}      Local storage value
 */
export default function useStateWithLocalStorage(key) {
  if (!key) {
    throw new Error('No key provided to useStateWithLocalStorage()');
  }

  const [value, setValue] = React.useState(
    window.localStorage.getItem(`${STORAGE_PREFIX}${key}`) || ''
  );

  React.useEffect(() => {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, value);
  }, [value, key]);

  return [value, setValue];
};
