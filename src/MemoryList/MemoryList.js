import React, { Component } from 'react';
import Memory from '../Memory/Memory';
import memories from '../fake-data-store';
import './MemoryList'

export default class MemoryList extends Component {
  render() {
    return (
      <section className='MemoryList'>
        <h2>Memories</h2>
        <ul className='MemoryList_list' aria-live='polite'>
          {memories.map(memory =>
            <Memory
              key={memory.id}
              {...memory}
            />
          )}
        </ul>
      </section>
    );
  }
}

