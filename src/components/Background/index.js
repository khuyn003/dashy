import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #333;
`;

export default function Background() {
  return (
    <Container />
  )
}
