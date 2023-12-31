'use client';
import * as React from 'react';
import styled from 'styled-components';

function NextStepWindow({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;

`;

export default NextStepWindow;
