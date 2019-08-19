import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Memory from '../Memory/Memory';
import Button from '../Button/Button';
import { MemoryContext } from '../MemoryContext';
import './MemoryList'

export default class MemoryList extends Component {
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
          <Button tag={Link} to='/userlanding' type='button' className='UserLandingPage_back-button'
          >Back to home page</Button>
        </section>
      </section>
    );
  }
}
