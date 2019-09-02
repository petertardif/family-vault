import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MemoryForm from '../MemoryForm/MemoryForm';
import { MemoryContext } from '../MemoryContext';
import './AddMemory.css';
import { API_BASE_URL, AWSAccessKeyId, AWSSecretKey } from '../config';
import S3FileUpload from 'react-s3';

const config = {
  bucketName: 'familyvaultapi',
  region: 'us-east-2',
  accessKeyId: AWSAccessKeyId,
  secretAccessKey: AWSSecretKey,
}

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

  updateMemoryMedia = (memoryMedia) => {
    console.log(memoryMedia.target.files[0]);
    S3FileUpload
      .uploadFile(memoryMedia.target.files[0], config)
      .then( (data) => {
        this.setState({memoryMedia: data.location})
      })
      .catch(err => console.error(err))
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
      media_url: this.state.memoryMedia,
      memory_date: e.target['memory-date'].value,
      date_updated: new Date().toDateString(),
    }
    console.log(newMemory);

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
        this.context.addMemory(memory)
        this.props.history.push(`/memorylist`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleClickGoBack = () => {
    this.props.history.push('/userlanding');
  } 
  
  render() {
    const { familyMembers = [] } = this.context;
    // variable below limits the user from selecting a date in the future.
    const today = new Date().toISOString().substr(0, 10);
    
    return (
      <div>
        <section className='add-memory-container'>
          <h1>New Memory</h1>
          <MemoryForm onSubmit={e => this.handleSubmit(e)}>
            <div className='add-memory-form '>
              <label htmlFor='memory-title-input'>
                Name it
              </label>
              <input type='text' id='memory-title-input' name='memory-title' onChange={e => this.updateMemoryTitle(e.target.value)} />
            </div>
            <div className='add-memory-form '>
              <label htmlFor='memory-description-input'>
                Describe it
              </label>
              <textarea id='memory-description-input' name='memory-description' onChange={e => this.updateMemoryDescription(e.target.value)} />
            </div>
            <div className='add-memory-form '>
              <label htmlFor='family-member-select'>
                Family Member
              </label>
              <select id='family-member-select' name='family-member-id' onChange={e => this.updateFamilyMember(e.target.value)}>
                <option value="empty">...</option>
                {familyMembers.map(fm =>
                  <option key={fm.id} value={fm.id}>
                    {fm.first_name} {fm.last_name}
                  </option>
                )}
              </select>
            </div>
            <div className='add-memory-form '>
              <label htmlFor='memory-media-input'>
                Add pic/video
              </label>
              <input type='file' id='memory-media-input' name='memory-media' onChange={this.updateMemoryMedia} />
            </div>
            <div className='add-memory-form '>
              <label htmlFor='memory-date-input'>
                Date
              </label>
              <input type='date' id='memory-date-input' max={today} name='memory-date' onChange={e => this.updateMemoryDate(e.target.value)} />
            </div>
            <div className='buttons add-memory-buttons'>
              <button type='submit' disabled={!this.state.formValid} className='Button blue'>
                Add memory
              </button>
              <button onClick={this.handleClickGoBack} className='Button blue'>Back</button>
            </div>
          </MemoryForm>
        </section>
      </div>
    )
  }
}

export default withRouter(AddMemory);
