import * as React from 'react';
import styled from 'styled-components';

interface IEditButton {
  title: string;
  onClick: () => void;
  className: string;
}

function EditButton({ title, onClick, className }: IEditButton) {
  return (
    <Button
      title={title}
      onClick={onClick}
      className={className}
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
