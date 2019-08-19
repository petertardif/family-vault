import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
import { API_BASE_URL } from '../config';
import './Memory.css';
import { MemoryContext } from '../MemoryContext';

class Memory extends Component {
  // static defaultProps = {
  //   onDeleteMemory: () => {},
  // }
  static contextType = MemoryContext;

  handleDeleteRequest = (event) => {
    event.preventDefault()
    const memoryId = this.props.id
    debugger
    fetch(`${API_BASE_URL}/memories/${memoryId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.deleteMemory(memoryId)
        this.props.history.push(`/memorylist/${memoryId}`)
      })
      .catch(error => {
        console.error({ error })
      })
      this.props.deleteMemory(memoryId)
      debugger
      this.props.history.push(`/memorylist`)
      // this.props.history.push(`/memorylist/${memoryId}`)
    };
  

  render() {
    return (
      <li key={this.props.id} className='Memory'>
        <div className='Memory_row'>
          <h2 className='Memory_title'>
            <Link to={`/memory/${this.props.id}`}>
              {this.props.memory_title}
              </Link>
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
                      {/* <button
                        className='Btn_memory_edit'
                        // onClick={() => props.onClickEdit(props.id)}
                      >
                        Edit
                      </button> */}
                      <button
                        type='button'
                        className='Btn_memory_delete'
                        onClick={this.handleDeleteRequest}
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

export default withRouter(Memory);