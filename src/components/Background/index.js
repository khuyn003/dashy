import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  ${props => props.bgImgUrl && `
    background: url(${props.bgImgUrl}) center / cover no-repeat;
  `}

  opacity: ${props => props.isVisible ? 1 : 0};
  transition: opacity 250ms ease-in-out;
`;

export default function Background({ className, isVisible, bgImgUrl }) {
  return (
    <Container
      className={className}
      isVisible={isVisible}
      bgImgUrl={bgImgUrl}
    />
  )
}
