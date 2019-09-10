import React, { Component } from 'react';
import Memory from '../Memory/Memory';
import { MemoryContext } from '../MemoryContext';
import '../MemoryFilter/MemoryFilter.css';

export default class MemoryFilter extends Component {
  static defaultProps = {
    match: {},
    memories: [],
    familyMembers: [],
    history: () => {},
  }

  static contextType = MemoryContext;

  handleClickAddMemory = () => {
    this.props.history.push('/add-memory');
  }
  
  handleClickGoBack = () => {
    this.props.history.push('/userlanding');
  }

  render() {
    let selectedFamilyMember = this.context.familyMembers.find(fm => fm.id.toString() === this.props.match.params.familyMemberId);
    debugger;
    let fmAtTopLevel = Object.keys(this.props.match.params).length > 0;

    let filteredMemories = this.context.memories.map(memory => 
      selectedFamilyMember.id === memory.familymember_id ? <Memory key={memory.id} date={memory.memory_date} /> : null
      
      );
    
    console.log(filteredMemories)

    const displayMemories = (fmAtTopLevel) ? filteredMemories : this.context.memories;
    
    return(
      <section className='container__top'>
        <h2 className='Memorylist__title'>Memories</h2> 
        <section className='MemoryList__list' aria-live='polite'>
          { displayMemories }
        </section>
        <div className='buttons add-memory-buttons'>
          <button onClick={this.handleClickAddMemory} className='Button blue'>Add a Memory</button>
          <button onClick={this.handleClickGoBack} className='Button blue'>Back</button>
        </div>
      </section>
    )
  }
  
}
