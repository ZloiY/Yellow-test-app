import React from 'react';
import { JogItem } from './jogListItem.component';
import './jogList.component.css';
import { TOKEN_LOCATION, GET_JOGS_URL, JOG_URL } from '../contants';
import addIcon from '../assets/add.svg';
import { AddJog } from '../addJog.modal';
import { NothingHere } from './nothingHere.component';


const createJog = ({ id, user_id, distance, date, time }) => ({ id, user_id, distance, time, date: new Date(date).getTime() });

const fetchJogs = (token) => fetch(GET_JOGS_URL, {
  cors: 'cors',
  headers: {
    'Authorization': token
  }
}).then((response) => response.json())
  .then((response) => response.response.jogs);

const addJog = (token, jog) => fetch(JOG_URL, {
  method: 'POST',
  cors: 'cors',
  headers: {
    'Authorization': token,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: encodeURI(`date=${jog.date}&distance=${jog.distance}&time=${jog.time}`),
}).then((response) => response.json())
  .then((response) => response.response)
  .then(createJog);

const updateJog = (token, jog) => fetch(JOG_URL, {
  method: 'PUT',
  cors: 'cors',
  headers: {
    'Authorization': token,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: encodeURI(`date=${jog.date}&distance=${jog.distance}&time=${jog.time}&user_id=${jog.user_id}&jog_id=${jog.id}`),
}).then((response) => response.json())
  .then((response) => response.response)
  .then(createJog);

const CreateJogComponent = ({ createJog }) => (
  <div className='first-jog-layout'>
    <div className='first-jog-container'>
      <NothingHere/>
      <button className='first-jog-btn' onClick={createJog}>Create your jog first</button>
    </div>
  </div>
);

export const JogList = ({ filter }) => {

  const [ jogs, setJogs ] = React.useState(null);
  const [ dateFrom, setDateFrom ] = React.useState(null);
  const [ dateTo, setDateTo ] = React.useState(null);
  const [ show, setShow ] = React.useState(false);
  const [ currentJog, setCurrentJog ] = React.useState(null);

  React.useEffect(() => {
    const accessToken = localStorage.getItem(TOKEN_LOCATION);
    if (accessToken) {
      fetchJogs(accessToken).then(setJogs);
    }
  }, []);

  const editJog = (jog) => {
    setCurrentJog(jog);
    setShow(true);
  }

  const addNewJog = (jog) => addJog(localStorage.getItem(TOKEN_LOCATION), jog)
    .then((jog) => setJogs([ jog, ...jogs ]))
    .then(() => setShow(false));

  const updateCurJog = (jog) => updateJog(localStorage.getItem(TOKEN_LOCATION), jog)
    .then((updatedJog) => setJogs(jogs.reduce((acc, jog) => jog.id == updatedJog.id ? [ ...acc, updatedJog ] : [ ...acc, jog ], [])))
    .then(() => setShow(false));

  const showJog = (jog) => (
    <JogItem onEdit={() => editJog(jog)} key={jog.id} {...jog}/>
  );

  const filterFromJog = (jog) => (dateFrom && new Date(dateFrom).getTime() <= jog.date) || dateFrom == null;

  const filterToJog = (jog) => (dateTo && new Date(dateTo).getTime() >= jog.date) || dateTo == null;

  const filterJog = (jog) => filter ? filterFromJog(jog) && filterToJog(jog)  : true;

  return (
    <>
      {jogs == null ? 'Loading...' : jogs.length > 0 ? 
      <div className='jog-list-layout'>
        {filter ? <div className='jog-filter'>
          <div className='filter-field'>
            <label className='filter-label' htmlFor='date-from'>Date from</label>
            <input className='filter-input' id='date-from' type='date'
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}/>
          </div>
          <div className='filter-field'>
            <label className='filter-label' htmlFor='date-to'>Date to</label>
            <input className='filter-input' id='date-to' type='date'
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}/>
          </div>
        </div> : null}
        <div className='jog-list'>
          {jogs.filter(filterJog).map(showJog)}
        </div>
        <div className='add-jog'>
          <button className='add-btn' onClick={() => setShow(true)}><img className='add-btn-img' src={addIcon} alt='+'/></button>
        </div>
      </div> : <CreateJogComponent createJog={() => setShow(true)}/>}
      <AddJog show={show} selectedJog={currentJog} cancel={() => setShow(false)}
        saveJog={(jog) => currentJog ? updateCurJog(jog) : addNewJog(jog)}/>
    </>
  );

}