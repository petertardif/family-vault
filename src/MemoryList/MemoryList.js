import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Memory from '../Memory/Memory';
import Button from '../Button/Button';
import { MemoryContext } from '../MemoryContext';
import './MemoryList'

export default class MemoryList extends Component {
  static contextType = MemoryContext;

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
