import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PiShoppingCart } from 'react-icons/pi';

const shakeAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-5deg); }
  100% { transform: rotate(0deg); }
`;

const ShakyCartIconWrapper = styled.div`
  display: inline-block;
  &:hover {
    animation: ${shakeAnimation} 0.25s infinite;
  }
`;

const ShakyCartIcon = () => {
    return (
        <ShakyCartIconWrapper>
            <PiShoppingCart className="h-7 w-7" />
        </ShakyCartIconWrapper>
    );
};

export default ShakyCartIcon;
