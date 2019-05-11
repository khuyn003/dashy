import React from 'react';
import { storiesOf } from '@storybook/react';
import Clock from './';

storiesOf('Clock', module)
  .add('Clock', () => <Clock />);
