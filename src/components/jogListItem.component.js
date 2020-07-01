import React from 'react';
import './jogListItem.component.css';
import icon from '../assets/jog-item-icon.svg';

export const dateOptions = { day: 'numeric', month:'numeric', year: 'numeric'};

export const JogItem = ({ date, speed, distance, time, onEdit }) => (
  <div onClick={onEdit} className='jog-item-layout'>
    <img className='jog-img' src={icon} alt=''></img>
    <div className='jog-info'>
      <span className='jog-date'>{new Date(date).toLocaleDateString('ru-RU', dateOptions)}</span>
      <div className='jog-prop'>
        <span className='title'>Speed: <span className='value'>{speed}</span></span>
      </div>
      <div className='jog-prop'>
        <span className='title'>Distance:  <span className='value'>{distance} km</span></span>
      </div>
      <div className='jog-prop'>
        <span className='title'>Time: <span className='value'>{time} min</span></span>
      </div>  
    </div>
  </div>
)