import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className='footer'>
          <ul className='footer_listitems'>
            <li>About</li>
            <li>Terms of Use</li>
          </ul>
        </footer>
      </>
    )
  }
}
