import * as React from 'react';
import styled from 'styled-components';

interface IEditButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
}

function EditButton({ title, onClick, ...delegated }: IEditButton) {
  return (
    <Button
      title={title}
      onClick={onClick}
      {...delegated}
    >
      📝
    </Button>
  );
}

const Button = styled.button`
  border: none;
  border-radius: 1rem;
  padding: 0.2rem 0.2rem;

  background-color: cornflowerblue;
  text-align: center;
  font-size: 1.5rem;
  min-width: 51px;
`;

export default EditButton;
