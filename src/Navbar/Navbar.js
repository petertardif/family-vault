import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

export default class Navbar extends Component {
  render() {
    return (
      <>
        <nav role="navigation">
          <div>
            <h1>FV</h1>
          </div>
          <ul>
            {/* <li><button id="myBtn">Sign up / Log in</button></li> */}
            <li><Button tag={Link} to='/userlanding' type='button' className='Navbar_tour-button'
          >Demo</Button></li>
          </ul>
        </nav>
      </>
    )
  }
}
