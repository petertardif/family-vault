import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Memory from '../Memory/Memory';
import { MemoryContext } from '../MemoryContext';
import './MemoryList'
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
      fetch(`https://agile-fortress-94521.herokuapp.com/api/memories`)
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
      <section className='MemoryList'>
        <h2>Memories</h2> 
        <ul className='MemoryList_list' aria-live='polite'>
          {this.context.memories.map(memory =>
            <Memory
              key={memory.id}
              {...memory}
            />
          )}
        </ul>
        <section className='buttons'>
          <button onClick={this.handleClick} className='Button blue'>Back to home page</button>
        </section>
      </section>
    );
  }
}

export default withRouter(MemoryList);