'use client';
import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import styled, { keyframes } from 'styled-components';

interface IDeleteDialogProps {
  children: React.ReactNode;
  confirmFunction: () => void;
}

function DeleteDialog({
  children,
  confirmFunction,
}: IDeleteDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogTitle>Delete Item?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
          <Flex>
            <AlertDialog.Cancel asChild>
              <Button
                color="blue"
                style={{ marginRight: 25 }}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                color="red"
                onClick={confirmFunction}
              >
                Yes, delete item
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

const overlayShow = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const contentShow = keyframes`
  0% { opacity: 0; transform: 'translate(-50%, -48%) scale(.96)' }
  100% { opacity: 1; transform: 'translate(-50%, -50%) scale(1)' }
`;

const AlertDialogOverlay = styled(AlertDialog.Overlay)`
  background-color: hsla(360, 100%, 100%, 0.49);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const AlertDialogContent = styled(AlertDialog.Content)`
  background-color: black;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 500px;
  max-height: 400px;
  height: auto;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`;

const AlertDialogTitle = styled(AlertDialog.Title)`
  margin: 0;
  color: white;
  font-size: 17px;
  font-weight: 500px;
`;

const AlertDialogDescription = styled(AlertDialog.Description)`
  margin-bottom: 20px;
  color: white;
  font-size: 15px;
  line-height: 1.5;
`;

const Flex = styled.div`
  display: flex;
  justify-content: flex-end;
  
`;

const Button = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  background-color: ${props => props.color === 'red' ? 'red' : 'var(--color-primary)'};
  color: white;

  &:hover {
    background-color: ${props => props.color === 'red' ? 'maroon' : '#065dbb'};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${props => props.color === 'red' ? 'maroon' : '#065dbb'};
  }
`;

export default DeleteDialog;
