import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className='footer'>
          <ul className='footer_listitems'>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/terms'>Terms of Use</Link></li>
          </ul>
        </footer>
      </>
    )
  }
}
