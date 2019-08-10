import React, { Component } from 'react';
import Memory from '../Memory/Memory';
import './MemoryList'

export default class MemoryList extends Component {
  static defaultProps = {
    memories: []
  };

  render() {
    const { memories } = this.props
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
