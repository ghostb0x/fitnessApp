import * as React from 'react';
import styled from 'styled-components';

interface InputProps {
  id: string;
  type: string;
  children?: React.ReactNode;
}
const FormInput = React.forwardRef<
  HTMLInputElement | HTMLSelectElement, // Union type for ref
  InputProps
>(({ children, id, type, ...delegated }, ref) => {
  let component;

  switch (type) {
    case 'number':
      component = (
        <StyledInput
          id={id}
          type="number"
          min="0"
          ref={ref as React.Ref<HTMLInputElement>}
          {...delegated}
        />
      );
      break;
    case 'text':
      component = (
        <StyledInput
          required
          id={id}
          type="text"
          ref={ref as React.Ref<HTMLInputElement>}
          {...delegated}
        />
      );
      break;
    case 'submit':
      component = (
        <SubmitButton
          id={id}
          type="submit"
          ref={ref as React.Ref<HTMLInputElement>}
          {...delegated}
        />
      );
      break;
    case 'checkbox':
      component = (
        <StyledCheckbox
          id={id}
          type="checkbox"
          ref={ref as React.Ref<HTMLInputElement>}
          {...delegated}
        />
      );
      break;
    case 'select':
      component = (
        <StyledSelect
          id={id}
          ref={ref as React.Ref<HTMLSelectElement>}
          {...delegated}
        >
          {children}
        </StyledSelect>
      );
    default:
      break;
  }

  return component;
});

FormInput.displayName = 'FormInput';

const StyledInput = styled.input`
  margin-bottom: 15px;
  width: 100%;
  height: 30px;
  font-size: 25px;
`;

const StyledCheckbox = styled.input`
  margin-bottom: 15px;
  height: 30px;
  width: 30px;
  font-size: 25px;
  margin-right: auto;
`;

const StyledSelect = styled.select`
  margin-bottom: 15px;
  width: 100%;
  height: 30px;
  font-size: 25px;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1.3rem;
`;

const SubmitButton = styled.input`
  margin-top: 10px;
  width: 100%;
  border: none;
  border-radius: 1rem;
  padding: 0.5rem 3rem;
  text-align: center;
  font-family: var(--font-roboto);
  font-size: 1.3rem;
  background-color: ${`var(--color-primary)`};
`;
export default FormInput;
