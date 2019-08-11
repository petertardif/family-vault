import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

export default class UserLandingPage extends Component {
  render() {
    return (
      <>
        <header>
          <h1>Create and forever cherish the moments!</h1>
        </header>
        <Button
          tag={Link}
          to='/add-memory'
          type='button'
          className='UserLandingPage_add-memory-button'
        >
          Add a Memory
        </Button>
        <Button
          tag={Link}
          to='/memorylist'
          type='button'
          className='UserLandingPage_add-memory-button'
        >
          Preview Memory Page
        </Button>
      </>
    )
  }
}
