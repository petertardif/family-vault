import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Memory from '../Memory/Memory';
import Button from '../Button/Button';
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
        <section className='buttons'>
          <Button tag={Link} to='/memorylist' type='button' className='MemoryList_back-button'
          >Back</Button>
        </section>
      </section>
    )    
  }
}
