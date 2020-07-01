import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddJog, dateParser } from './addJog.modal';

test('jog modal renders correctly', async () => {
  const jog = {
    distance: 8,
    time: 40,
    date: 1593604245
  };
  const { getByLabelText } = render(<AddJog selectedJog={jog} show={true}/>)
  expect(getByLabelText(/Distance/i)).toBeInTheDocument()
  expect(getByLabelText(/Time/i)).toBeInTheDocument()
  expect(getByLabelText(/Date/i)).toBeInTheDocument()
  expect(await screen.findByDisplayValue(`${jog.distance}`)).toBeInTheDocument()
  expect(await screen.findByDisplayValue(`${jog.time}`)).toBeInTheDocument()
  expect(await screen.findByDisplayValue(dateParser(jog.date))).toBeInTheDocument()
});
