import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
}

function Button({ children, color, onClick, ...delegated }: ButtonProps) {
  return <B color={color} onClick={onClick} {...delegated}>{children}</B>;
}

const B = styled.button`
  margin-top: 10px;
  width: 90%;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 3rem;
  
  background-color: ${(props) => props.color || `var(--color-primary)`};
  text-align: center;
  /* font-family: var(--font-roboto); */
  font-size: 1.3rem;
  
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export default Button;
