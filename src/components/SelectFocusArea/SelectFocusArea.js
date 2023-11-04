'use client';
import { focusCategories } from '@/data/categories';
import React from 'react';
import Button from '../Button';

function SelectFocusArea() {
  const [selectedArea, setSelectedArea] = React.useState('Unselected');
  return (
    <>
      <div>
        <h2>Options</h2>
        {focusCategories.map(({ id, name }) => {
          return (
            <Button
              key={id}
              onClick={() => {
                setSelectedArea(name);
              }}
            >
              {name}
            </Button>
          );
        })}
      </div>
      <div>
        <h3>Today&apos;s Selected Focus Area: {selectedArea}</h3>
      </div>
    </>
  );
}

export default SelectFocusArea;
