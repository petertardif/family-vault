import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Toggle from '../Toggle/Toggle';
import { API_BASE_URL } from '../config';
import '../MemoryList/MemoryList.css';
import { MemoryContext } from '../MemoryContext';
import './Memory.css';
import '../Button/Button.css'

class Memory extends Component {
  static contextType = MemoryContext;

  handleDeleteRequest = () => {
    const memoryId = this.props.id
    fetch(`${API_BASE_URL}/memories/${memoryId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(e => Promise.reject(e))
        }
        return 
      })
      .then(() => {
        this.context.deleteMemory(memoryId)
        this.props.history.push(`/memorylist`)
      })
      .catch(error => {
        console.error({ error })
      })      
    };
  

  render() {
    const dateFormatted = new Date(this.props.memory_date).toDateString();

    return (
      <article key={this.props.id} className='Memory'>
        <div>
          <div className='Memory_row'>
            <h2 className='Memory_title'>
              <Link to={`/memory/${this.props.id}`}>
                {this.props.memory_title}
                </Link>
            </h2>
            <div className='Memory_dates'>
              <div className='Memory_dates-modified'>
                  Modified: <span className='Date'>{dateFormatted}</span> 
              </div>
            </div>
            <Toggle>
              {({ on, toggle }) => (
                <>
                  {on && 
                    <>
                      <div >
                        {
                          this.props.media_url 
                          ? <img className='img-flex img-center' src={this.props.media_url} alt={`supporting visual for ${this.props.title}` }/>
                          : null
                        }
                      </div>
                      <p className='Memory_description'>
                        {this.props.memory_desc}
                      </p>
                      <div className='Memory_buttons'>
                        {/* leave the below code for when I add in the edit a memory feature */}
                        {/* <button
                          className='Btn_memory_edit'
                          // onClick={() => props.onClickEdit(props.id)}
                        >
                          Edit
                        </button> */}
                        <button
                          className='Button fire-red'
                          type='button'
                          onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.handleDeleteRequest() } }
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  }
                  <button className='smallButton grey' onClick={toggle}>Expand / Collapse</button>
                </>
              )}
            </Toggle>
          </div>
        </div>
      </article>
    )
  }
}

Memory.defaultProps = {
  memories: [],
  onClickDelete: () => {},
}

export default withRouter(Memory);