import React, { Component } from 'react';
import Memory from '../Memory/Memory';
import './MemoryList'
import { MemoryContext } from '../MemoryContext';

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
      </section>
    );
  }
}
