import * as React from 'react';
import styled from 'styled-components';
import Button from '../Button';

interface InputProps {
  id: string;
  type: string;
  children?: React.ReactNode;
}

function FormInput({ children, id, type, ...delegated }: InputProps) {

  let component;


  switch (type) {
    case "number":
      component= <StyledInput
      id={id}
      type="number"
      min="0"
      {...delegated}
    />
      break;
    case "submit":
      component = <SubmitButton
      id={id}
      type="submit"
      {...delegated}
    />
      break;
    case "checkbox":
      component = <StyledInput id={id} type="checkbox" {...delegated}/>
      break;
    case "select":
      component = <StyledSelect id={id} {...delegated}>{children}</StyledSelect>
    default:
      break;
  }



  return component

}

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 25px;
  margin-right: auto;
`;

const StyledSelect = styled.select`
  width: 100%;
  height: 30px;
  font-size: 25px;
  margin-right: auto;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1.3rem;
`;

const SubmitButton = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 10rem;
  padding: 0.5rem 3rem;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1.3rem;
  background-color: ${`var(--color-primary)`};
`;
export default FormInput;
