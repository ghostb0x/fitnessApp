import * as React from 'react';
import styled from 'styled-components';

interface LabelProps {
  children: React.ReactNode;
  htmlFor: string;
}

function InputLabel({ children, htmlFor }: LabelProps) {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
}

const StyledLabel = styled.label`
  font-size: 1.3rem;
  width: 100%;
`;

export default InputLabel;
