import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import MemoryForm from '../MemoryForm/MemoryForm';
import { MemoryContext } from '../MemoryContext';
import './AddMemory.css';
import Button from '../Button/Button';
import { API_BASE_URL } from '../config';

class AddMemory extends Component {
  static defaultProps = {
    familyMembers: [],
    history: {
      push: () => { }
    }
  }

static contextType = MemoryContext;

constructor(props) {
  super(props);
  this.state = {
    memoryTitle: '',
    memoryDescription: '',
    memoryFamilyMember: '',
    memoryMedia: '',
    memoryDate: '',
    memoryTitleValid: false,
    memoryDescriptionValid: false,
    memoryFamilyMemberValid: false,
    memoryDateValid: false,
    formValid: false,
    validationMessages: {
      memoryTitle: '',
      memoryDescription: '',
      memoryFamilyMember: '',
      memoryDate: '',
    }
  }
}

  updateMemoryTitle(memoryTitle) {
    this.setState({memoryTitle}, () => {this.validateMemoryTitle(memoryTitle)});
  }

  updateMemoryDescription(memoryDescription) {
    this.setState({memoryDescription}, () => {this.validateMemoryDescription(memoryDescription)});
  }

  updateFamilyMember(memoryFamilyMember) {
    this.setState({memoryFamilyMember}, () => {this.validateFamilyMember(memoryFamilyMember)});
  }

  updateMemoryMedia(memoryMedia) {
    this.setState({memoryMedia});
  }

  updateMemoryDate(memoryDate) {
    this.setState({memoryDate}, () => {this.validateMemoryDate(memoryDate)});
  }

  validateMemoryTitle(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.memoryTitle = 'Please type a memory title';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      memoryTitleValid: !hasError
    }, this.formValid );
  }

  validateMemoryDescription(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.memoryDescription = 'Please type a description of the memory ';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      memoryDescriptionValid: !hasError
    }, this.formValid );
  }

  validateFamilyMember(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    if(fieldValue === "empty") {
      fieldErrors.memoryFamilyMember = 'Please select a Family Member';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      memoryFamilyMemberValid: !hasError
    }, this.formValid );
  }

  validateMemoryDate(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.memoryDate = 'Please enter a valid date.';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      memoryDateValid: !hasError
    }, this.formValid );
  }

  formValid() {
    this.setState({
      formValid: this.state.memoryTitleValid && this.state.memoryDescriptionValid && this.state.memoryFamilyMemberValid &&
      this.state.memoryDateValid
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newMemory = {
      memory_title: e.target['memory-title'].value,
      memory_desc: e.target['memory-description'].value,
      familymember_id: e.target['family-member-id'].value,
      media_url: "https://via.placeholder.com/150",
      memory_date: e.target['memory-date'].value,
      date_updated: new Date().toDateString(),
    }
    fetch(`${API_BASE_URL}/memories`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newMemory),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(memory => {
        this.context.addMemory(newMemory)
        this.props.history.push(`/memorylist`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { familyMembers = [] } = this.context;
    
    return (
      <section>
        <h1>New Memory</h1>
        <MemoryForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='memory-title-input'>
              Memory Title
            </label>
            <input type='text' id='memory-title-input' name='memory-title' onChange={e => this.updateMemoryTitle(e.target.value)} />
          </div>
          <div className='field'>
            <label htmlFor='memory-description-input'>
              Describe it
            </label>
            <textarea id='memory-description-input' name='memory-description' onChange={e => this.updateMemoryDescription(e.target.value)} />
          </div>
          <div className='field'>
            <label htmlFor='family-member-select'>
              Family Member
            </label>
            <select id='family-member-select' name='family-member-id' onChange={e => this.updateFamilyMember(e.target.value)}>
              <option value="empty">...</option>
              {familyMembers.map(fm =>
                <option key={fm.id} value={fm.id}>
                  `{fm.first_name} {fm.last_name}`
                </option>
              )}
            </select>
          </div>
          <div className='field'>
            <label htmlFor='memory-media-input'>
              Attach an image or video
            </label>
            <input type='file' id='memory-media-input' name='memory-media' onChange={e => this.updateMemoryMedia(e.target.value)} />
          </div>
          <div className='field'>
            <label htmlFor='memory-date-input'>
              Date
            </label>
            <input type='date' id='memory-date-input' name='memory-date' onChange={e => this.updateMemoryDate(e.target.value)} />
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add memory
            </button>
            <Button tag={Link} to='/userlanding' type='button' className='AddMemory_back-button'
            >Back</Button>
          </div>
        </MemoryForm>
      </section>
    )
  }
}

export default withRouter(AddMemory);