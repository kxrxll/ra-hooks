import React, {useState, useEffect} from 'react';
import './bootstrap.css';
import {nanoid} from 'nanoid';

function List() {
  const [list, setList] = useState();
  const [aside, setAside] = useState();

  function getList() {
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json').then(response => response.json()).then(result => setList(result));
  }

  function getItem(id) {
    fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${id}.json`).then(response => response.json()).then(result => setAside(result));
  }

  function handleClick(evt) {
    evt.preventDefault();
    const id = evt.target.id;
    if (!aside || aside.id !== id) {
      getItem(id);
    }
  }

  useEffect(() => {
    getList();
  }, [])

  return (
    <>
      <div style={{display: 'flex'}}>
        <div style={{width: '40%', margin:'5%'}}>
          <ul className="list-group">
            {list?.map(item => <button className="list-group-item" key={nanoid()} id={item.id} onClick={handleClick}>{item.name}</button>)}
          </ul>
        </div>
        { aside ? 
        <div className="card" style={{width: '40%', margin:'5%'}}>
          <img src={aside.avatar} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{aside.name}</h5>
            <p className="card-text">City: {aside.details.city}</p>
            <p className="card-text">Company: {aside.details.company}</p>
            <p className="card-text">Position: {aside.details.position}</p>
          </div>
        </div> : false }
      </div>
    </>
  )
}

export default List;
