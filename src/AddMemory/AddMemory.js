import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import MemoryForm from '../MemoryForm/MemoryForm';
import { MemoryContext } from '../MemoryContext';
import ValidationError from '../ValidationError/ValidationError';
import './AddMemory.css';
import { API_BASE_URL, AWS_BASE_URL } from '../config';

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
    memoryTitle: {
      value: '',
      touched: false
    },
    memoryDescription: {
      value: '',
      touched: false
    },
    memoryFamilyMember: {
      value: '',
      touched: true
    },
    memoryMedia: '',
    memoryDate: {
      value: '',
      touched: true
    },
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
    this.setState({memoryTitle: { value: memoryTitle, touched: true } }, () => {this.validateMemoryTitle(memoryTitle)});
  }

  updateMemoryDescription(memoryDescription) {
    this.setState({memoryDescription: { value: memoryDescription, touched: true } }, () => {this.validateMemoryDescription(memoryDescription)});
  }

  updateFamilyMember(memoryFamilyMember) {
    this.setState({memoryFamilyMember: { value: memoryFamilyMember, touched: true } }, () => {this.validateFamilyMember(memoryFamilyMember)});
  }

  updateMemoryMedia = (memoryMedia) => {
    const file = memoryMedia.target.files[0]
    if (file == null) {
      return alert ('No file selected');
    }
    this.uploadToS3(file)
      .then(url => {
        this.setState({memoryMedia: url})
      })
  }
  getSignedRequestFetch = (file) => {
    return fetch(`${AWS_BASE_URL}/sign-s3?fileName=${file.name}&fileType=${file.type}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    });
  }

  uploadFile = (file, signedRequest, url) => {
    const options = {
      method: 'PUT',
      body: file
    };
    return fetch(signedRequest, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return url;
      });
  }

  uploadToS3 = (file) => {
    return this.getSignedRequestFetch(file)
      .then(json => this.uploadFile(file, json.signedRequest,json.url))
      .then(url => {
        return url;
      })
      .catch(err => {
        console.error(err);
        return null;
      });
  }

  updateMemoryDate(memoryDate) {
    this.setState({memoryDate: { value: memoryDate, touched: true } }, () => {this.validateMemoryDate(memoryDate)});
  }

  validateMemoryTitle(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.memoryTitle = 'Please type a memory title';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.memoryTitle = 'Memory title must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.memoryTitle = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      memoryTitleValid: !hasError
    }, this.formValid );
  };

  validateMemoryDescription(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.memoryDescription = 'Please type a description of the memory ';
      hasError = true;
    } else {
      fieldErrors.memoryDescription = '';
      hasError = false;
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
    } else {
      fieldErrors.memoryFamilyMember = '';
      hasError = false;
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
    } else {
      fieldErrors.memoryDate = '';
      hasError = false;
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
              <ValidationError hasError={!this.state.memoryTitleValid} message={this.state.validationMessages.memoryTitle}/>
            </div>
            <div className='add-memory-form '>
              <label htmlFor='memory-description-input'>
                Describe it
              </label>
              <textarea id='memory-description-input' name='memory-description' onChange={e => this.updateMemoryDescription(e.target.value)} />
              <ValidationError hasError={!this.state.memoryDescriptionValid} message={this.state.validationMessages.memoryDescription}/>
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
              <ValidationError hasError={!this.state.memoryFamilyMemberValid} message={this.state.validationMessages.memoryFamilyMember}/>
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
              <ValidationError hasError={!this.state.memoryDateValid} message={this.state.validationMessages.memoryDate}/>
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
