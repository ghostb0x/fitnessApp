import React from 'react';
import styled from 'styled-components';

function Button({children, ...delegated}) {
  return <B {...delegated}>{children}</B>;
}

const B = styled.button`
  
  margin-top: ${(props) => props.$marginTop || '10px'};
  margin-left: 5px;
  margin-right: 5px;
  
  width: ${(props) => props.$width || "auto"};
  border: none;
  border-radius: 10rem;
  padding: 0.5rem 3rem;

  background: ${(props) => props.$color || `var(--color-accent)`};
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1.3rem;

`;

export default Button;
