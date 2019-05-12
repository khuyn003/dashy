import React from 'react';
import { storiesOf } from '@storybook/react';

import Background from './';
import mockImg from 'mocks/backgroundImg';

storiesOf('Background', module)
  .add('Background', () => <Background isVisible={true} bgImgUrl={mockImg} />)
;
