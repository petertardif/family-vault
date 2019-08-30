import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './UserLandingPage.css';

class UserLandingPage extends Component {

handleClickAddMemory = () => {
  this.props.history.push('/add-memory');
}

handleClickGoBack = () => {
  this.props.history.push('/memorylist');
}

  render() {
    return (
      <div className='userlandingpage-header'>
        <header >
          <h1>Create and forever cherish the moments!</h1>
        </header>
        <section className='userlandingpage-footer'>
          <button onClick={this.handleClickAddMemory} className='Button blue'>Add a Memory</button>
          <button onClick={this.handleClickGoBack} className='Button blue'>Memory Page</button>
        </section>
      </div>
    )
  }
}

export default withRouter(UserLandingPage);
