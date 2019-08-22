import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class UserLandingPage extends Component {

handleClickAddMemory = () => {
  this.props.history.push('/add-memory');
}

handleClickGoBack = () => {
  this.props.history.push('/memorylist');
}

  render() {
    return (
      <>
        <header>
          <h1>Create and forever cherish the moments!</h1>
        </header>
        <button onClick={this.handleClickAddMemory} className='Button blue'>Add a Memory</button>
        <button onClick={this.handleClickGoBack} className='Button blue'>Preview Memory Page</button>
      </>
    )
  }
}

export default withRouter(UserLandingPage);
