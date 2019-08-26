import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <>
        <footer className='footer'>
          <ul className='footer_listitems'>
            <li><Link to='/about' className='footer_listitems'>About</Link></li>
            <li><Link to='/terms' className='footer_listitems'>Terms of Use</Link></li>
          </ul>
        </footer>
      </>
    )
  }
}
