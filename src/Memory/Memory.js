import React, { Component } from 'react';
import Toggle from '../Toggle/Toggle';
import './Memory.css';

export default class Memory extends Component {
  
  render() {
    return (
      <li className='Memory'>
        <div className='Memory_row'>
          <h2 className='Memory_title'>
            {this.props.title}
          </h2>
          <div className='Memory_dates'>
            <div className='Memory_dates-modified'>
                Modified <span className='Date'>{this.props.memory_date}</span> 
            </div>
          </div>
          <Toggle>
            {({ on, toggle }) => (
              <>
                {on && 
                  <>
                    <img src={this.props.media_url} alt={`supporting visual for ${this.props.title}`}/>
                    <p className='Memory_description'>
                      {this.props.memory_desc}
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
                    </div>
                  </>
                }
                <button onClick={toggle}>Expand / Collapse</button>
              </>
            )}
          </Toggle>
        </div>
      </li>
    )
  }
}

Memory.defaultProps = {
  onClickDelete: () => {},
}