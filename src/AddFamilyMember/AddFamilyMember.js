import React, { Component } from 'react';
import { MemoryContext } from '../MemoryContext';
import ValidationError from '../ValidationError/ValidationError';
import { API_BASE_URL } from '../config';
import './AddFamilyMember.css';

export default class AddFamilyMember extends Component {
  static defaultProps = {
    familyMembers: [],
    history: {
      push: () => {}
    },
  }

  static contextType = MemoryContext;

  constructor(props) {
    super(props); 
    this.state = {
      firstName: '',
      firstNameValid: false,
      lastName: '',
      lastNameValid: false,
      formValid: false,
      validationMessages: {
        firstName: '',
        lastName: ''
      }
    }
  }

  updateFirstName(firstName) {
    this.setState({firstName}, () => {this.validateFirstName(firstName) });
  }

  updateLastName(lastName) {
    this.setState({lastName}, () => {this.validateLastName(lastName) });
  }

  validateFirstName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.firstName = 'First name is required.';
      hasError = true;
    } 

    this.setState({
      validationMessages: fieldErrors,
      firstNameValid: !hasError
    }, this.formValid);
  }

  validateLastName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.lastName = 'Last name is required.';
      hasError = true;
    } 

    this.setState({
      validationMessages: fieldErrors,
      lastNameValid: !hasError
    }, this.formValid);
  }

  formValid() {
    this.setState({
      formValid: this.state.firstNameValid && this.state.lastNameValid
    });
  }

  handleClickGoBack = (e) => {
    e.preventDefault();
    this.props.history.push('/memorylist');
  } 

  // UPDATE FOR FAMILY MEMBER
  handleSubmit(e) {
    e.preventDefault();
    const newFamilyMember = {
      first_name: e.target['first-name'].value,
      last_name: e.target['last-name'].value,
    }

    fetch(`${API_BASE_URL}/family-members`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFamilyMember),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(familyMember => {
        this.context.addFamilyMember(familyMember)
        this.props.history.push(`/userlanding`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <>
        <section className='add-fm-container'>
          <h2>Add a Family Member</h2>
          <form 
              onSubmit={event => this.handleSubmit(event)}
            >
              <div className='add-fm-form'>
                <label htmlFor='first-name-input'>
                  First Name
                </label>
                <input 
                  type='text' 
                  id='first-name-input' 
                  name='first-name' 
                  onChange={e => this.updateFirstName(e.target.value)} 
                  aria-label='Add a first  name'
                  aria-required='true'
                  aria-describedby='add-first-name-input'
                />
                <ValidationError id='add-first-name-input' hasError={!this.state.firstNameValid} message={this.state.validationMessages.firstName}/>
              </div>
              <div className='add-fm-form'>
                <label htmlFor='last-name-input'>
                  Last Name
                </label>
                <input 
                  type='text' 
                  id='last-name-input' 
                  name='last-name' 
                  onChange={e => this.updateLastName(e.target.value)} 
                  aria-label='Add a last  name'
                  aria-required='true'
                  aria-describedby='add-last-name-input'
                />
                <ValidationError id='add-last-name-input' hasError={!this.state.lastNameValid} message={this.state.validationMessages.lastName}/>
              </div>
              <div className='buttons'>
              <button type='submit' disabled={!this.state.formValid} className='Button blue'>
                Add Family Member
              </button>
              <button onClick={this.handleClickGoBack} className='Button blue'>Back</button>
              </div>
            </form>
        </section>
      </>
    )
  }
}