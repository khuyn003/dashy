import React from 'react';
import { storiesOf } from '@storybook/react';

import Greeting from './';
import {
  MORNING,
  AFTERNOON,
  SUNSET,
  NIGHT
} from 'app-constants';

storiesOf('Greeting', module)
  .add('Morning', () => <Greeting username="Kevin" timeOfDay={MORNING} />)
  .add('Afternoon', () => <Greeting username="Kevin" timeOfDay={AFTERNOON} />)
  .add('Sunset', () => <Greeting username="Kevin" timeOfDay={SUNSET} />)
  .add('Night', () => <Greeting username="Kevin" timeOfDay={NIGHT} />)
;
