import React from 'react';
import sadFace from '../assets/sad-face.svg';
import './nothingHere.component.css';

export const NothingHere = () => (
  <div className='nothing-layout'>
    
      <img className='nothing-img' src={sadFace} alt=':('/>
      <span className='nothing-text'>Nothing is there</span>
    
  </div>
)