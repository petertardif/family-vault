import React, { Component } from 'react';
import Memory from '../Memory/Memory';
import { MemoryContext } from '../MemoryContext';

export default class MemoryPage extends Component {
  static defaultProps = {
    match: {},
  }

  static contextType = MemoryContext;

  render() {
    let selectedMemory = Number(this.props.match.params.memoryId);
    
    let filteredMemory = this.context.memories.map(memory => selectedMemory === memory.id ? <Memory key={memory.id} {...memory}/> : null
    );

    return (
      <section>
        {filteredMemory}
      </section>
    )    
  }
}
