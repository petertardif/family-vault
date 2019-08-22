import React, { Component } from 'react';
import Memory from '../Memory/Memory';
import { MemoryContext } from '../MemoryContext';

export default class MemoryPage extends Component {
  static defaultProps = {
    match: {},
  }

  static contextType = MemoryContext;

  handleClickGoBack = () => {
    this.props.history.push('/memorylist');
  }

  render() {
    let selectedMemory = Number(this.props.match.params.memoryId);
    
    let filteredMemory = this.context.memories.map(memory => selectedMemory === memory.id ? <Memory key={memory.id} {...memory} deleteMemory={this.context.deleteMemory}/> : null
    );

    return (
      <section>
        {filteredMemory}
        <section className='buttons'>
          <button onClick={this.handleClickGoBack} className='Button'>Back</button>
        </section>
      </section>
    )    
  }
}
