'use client';
import * as React from 'react';
import styled from 'styled-components';

function NextStepWindow({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  position: sticky;
  bottom: 0;
  /* height: 100px; */
  width: 100%;
  border-bottom: none;
`;

export default NextStepWindow;
