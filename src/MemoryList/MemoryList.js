import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Memory from '../Memory/Memory';
import { MemoryContext } from '../MemoryContext';
import { API_BASE_URL } from '../config';
import './MemoryList.css'
import '../Button/Button.css';

class MemoryList extends Component {
  static defaultProps = {
    memories: [],
    familyMembers: [],
    history: {
      push: () => { }
    }
  }

  static contextType = MemoryContext;
  
  componentWillMount() {
      fetch(`${API_BASE_URL}/memories`)
      // fetch(`https://agile-fortress-94521.herokuapp.com/api/family-members`)
      
      .then((memoriesResponse) => {
        if(!memoriesResponse.ok) {
          return memoriesResponse.json().then(error => Promise.reject(error))
        }
        return memoriesResponse.json()
      })
      .then((memories) => {
        this.context.updateMemoryList(memories)
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      })
  }

  handleClick = () => {
    this.props.history.push('/userlanding');
  }

  render() {
    return (
      <section>
        <h2 className='Memorylist__title'>Memories</h2> 
        <section className='MemoryList__list' aria-live='polite'>
          {this.context.memories.map(memory =>
            <Memory
              key={memory.id}
              {...memory}
            />
          )}
        </section>
        <section className='buttons'>
          <button onClick={this.handleClick} className='Button blue'>Back to home page</button>
        </section>
      </section>
    );
  }
}

export default withRouter(MemoryList);