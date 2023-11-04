import React from 'react';
import styled from 'styled-components';

function Button({children, ...delegated}) {
  return <B {...delegated}>{children}</B>;
}

const B = styled.button`
align-self: center;
  
  margin-top: ${(props) => props.$marginTop || '10px'};
  margin-left: 5px;
  margin-right: 5px;
  
  width: ${(props) => props.$width || '90%'};
  border: none;
  border-radius: 10rem;
  padding: 0.5rem 3rem;
  
  display: flex;
  justify-content: center;
  align-items: center;

  background: ${(props) => props.$color || `var(--color-accent)`};
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1.3rem;

`;

export default Button;
