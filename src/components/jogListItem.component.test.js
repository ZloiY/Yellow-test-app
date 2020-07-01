import React from 'react';
import { render } from '@testing-library/react';
import { JogItem, dateOptions } from './jogListItem.component';

test('jog list item renders correctly', () => {
  const props = {
    date: 1593604245,
    speed: '15',
    distance: '5',
    time: '40'
  }
  const { getByText } = render(<JogItem {...props}/>);
  const date = getByText(new Date(1593604245).toLocaleDateString('ru-RU', dateOptions));
  const speedValue = getByText(props.speed)
  const distanceValue = getByText(props.distance + ' km')
  const timeValue = getByText(props.time + ' min')
  const speed = getByText(/Speed:/i)
  const distance = getByText(/Distance:/i)
  const time = getByText(/Time:/i)
  expect(date).toBeInTheDocument();
  expect(speedValue).toBeInTheDocument();
  expect(distanceValue).toBeInTheDocument();
  expect(timeValue).toBeInTheDocument();
  expect(speed).toBeInTheDocument();
  expect(distance).toBeInTheDocument();
  expect(time).toBeInTheDocument();
})