import React from 'react';
import './Memory.css';

export default function Memory(props) {
  return (
    <div className='Memory'>
      <h2 className='Memory_title'>
        {props.title}
      </h2>
      <div className='Memory_dates'>
        <div className='Memory_dates-modified'>
            Modified <span className='Date'>{props.memory_date}</span> 
        </div>
      </div>
      <img src={props.media_url} alt={`supporting visual for ${props.title}`}/> 
      <p className='Memory_description'>
        {props.memory_desc}
      </p>
      <div className='Memory_buttons'>
        <button
          className='Btn_memory_edit'
          // onClick={() => props.onClickEdit(props.id)}
        >
          Edit
        </button>
        <button
          className='Btn_memory_delete'
          // onClick={() => props.onClickDelete(props.id)}
        >
          Delete
        </button>
        <button
          className='Btn_memory_back'
          // onClick={() => props.onClickBack(props.id)}
        >
          Back
        </button>
      </div>
    </div>
  )
}