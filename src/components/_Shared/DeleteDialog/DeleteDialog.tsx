'use client'
import React from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { styled, keyframes } from '@stitches/react';

interface IDeleteDialogProps {
  children: React.ReactNode,
  confirmFunction: () => void,
}

// e?: React.MouseEvent<HTMLButtonElement, MouseEvent>

function DeleteDialog({ children, confirmFunction }: IDeleteDialogProps) {
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
          <Flex css={{ justifyContent: 'flex-end' }}>
            <AlertDialog.Cancel asChild>
              <Button
                variant="blue"
                css={{ marginRight: 25 }}
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button variant="red" onClick={confirmFunction}>Yes, delete item</Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialogContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const AlertDialogOverlay = styled(AlertDialog.Overlay, {
  backgroundColor: 'hsla(360, 100%, 100%, 0.49)',
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const AlertDialogContent = styled(AlertDialog.Content, {
  backgroundColor: 'black',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,

  '&:focus': { outline: 'none' },
});

const AlertDialogTitle = styled(AlertDialog.Title, {
  margin: 0,
  color: "white",
  fontSize: 17,
  fontWeight: 500,
});

const AlertDialogDescription = styled(AlertDialog.Description, {
  marginBottom: 20,
  color: "white",
  fontSize: 15,
  lineHeight: 1.5,
});

const Flex = styled('div', { display: 'flex' });

const Button = styled('button', {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      red: {
        backgroundColor: 'red',
        color: 'white',
        '&:hover': { backgroundColor: "maroon"},
        '&:focus': { boxShadow: `0 0 0 2px red` },
      },
      blue: {
        backgroundColor: "var(--color-primary)",
        color: 'white',
        '&:hover': { backgroundColor: "#065dbb" },
        '&:focus': { boxShadow: `0 0 0 2px #065dbb` },
      },
    },
  },

  defaultVariants: {
    variant: 'blue',
  },
});

export default DeleteDialog;
