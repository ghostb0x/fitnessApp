import * as React from 'react';
import styled from 'styled-components';


interface FormProps {
  children: React.ReactNode;
  onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
}

function Form({ children, onSubmit, ...delegated }: FormProps) {
  return <StyledForm onSubmit={onSubmit} {...delegated} >{children}</StyledForm>;
}

const StyledForm = styled.form`
  width: 75%;
  padding: 50px;
`;

export default Form;
