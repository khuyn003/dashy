import {
  MORNING,
  AFTERNOON,
  SUNSET,
  NIGHT
} from 'app-constants';

export default function getBackgroundObj(timeOfDay, callback) {
  const collectionIds = {
    [MORNING]: 3313547,
    [AFTERNOON]: 4798389,
    [SUNSET]: 4798397,
    [NIGHT]: 4798403
  }

  const collectionId = collectionIds[timeOfDay];

  if (!collectionId) return;

  return fetch(`https://source.unsplash.com/collection/${collectionId}/${window.screen.availWidth}x${window.screen.availHeight}`)
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
      callback(JSON.stringify({
        'url': dataUrl,
        'day': (new Date()).getDay()
      }));
    })
    .catch(error => console.error(error))
  ;
};
