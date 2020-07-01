import React from 'react';
import './addJog.modal.css';
import cancelIcon from './assets/cancel.svg';

export const dateParser = (date) => {
  date = new Date(date);
  const fitDateFormat = (date) => date <= 9 ? `0${date}` : `${date}`
  return `${date.getFullYear()}-${fitDateFormat(date.getMonth() + 1)}-${fitDateFormat(date.getDate())}`;
}

const SET_DISTANCE = 'SET_DISTANCE';
const SET_TIME = 'SET_TIME';
const SET_DATE = 'SET_DATE';
const SET_JOG = 'SET_JOG';

const jogReducer = (jog, [ action, value ]) => {
  switch (action) {
    case SET_DISTANCE:
      return { ...jog, distance: value };
    case SET_TIME:
      return { ...jog, time: value };
    case SET_DATE:
      return { ...jog, date: new Date(value).toISOString() };
    case SET_JOG:
      return value;
  }
}

const log = (val) => { console.log(val); return val}

const initJog = () => ({ distance: 0, time: 0, date: new Date() });

export const AddJog = ({ saveJog, show, cancel, selectedJog }) => { 
  
  const [ jog, dispatch ] = React.useReducer(jogReducer, undefined, initJog);

  React.useEffect(() => {
    if (selectedJog) {
      dispatch([ SET_JOG, { ...selectedJog, date: new Date(selectedJog.date).toISOString() }]);
    }
  }, [selectedJog]);

  const dispatchAction = (action) => (event) => dispatch([ action, event.target.value ]);

  const onSave = () => {
    saveJog(jog);
    dispatch([ SET_JOG, initJog() ]);
  }

  return (
    show ?
    <div className='modal-layout'> 
      <div className='modal-window'>
        <button className='cancel-btn'
          onClick={cancel}><img src={cancelIcon} alt='X'/></button>
        <form className='form-layout' onSubmit={onSave}>
          <div className='form-field'>
            <label className='field-label' htmlFor='distance'>Distance</label>
            <input className='field-input' type='number' id='distance'
              value={jog.distance}
              onChange={dispatchAction(SET_DISTANCE)} required/>
          </div>
          <div className='form-field'>
            <label className='field-label' htmlFor='time'>Time</label>
            <input className='field-input' type='number' id='time'
              value={jog.time}
              onChange={dispatchAction(SET_TIME)} required/>
          </div>
          <div className='form-field'>
            <label className='field-label' htmlFor='date'>Date</label>
            <input className='field-input' type='date' id='date'
              value={dateParser(jog.date)}
              onChange={dispatchAction(SET_DATE)} required/>
          </div>
          <input className='form-submit' type='submit' value='Save'/>
        </form>
      </div>
    </div> : null
  );
};