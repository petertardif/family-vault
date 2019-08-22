import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <>
        <nav className='Navbar' role="navigation">
          <div>
            <h1 className='Navbar__Icon'><Link to='/'>FV</Link> </h1>
          </div>
          <ul className={'Navbar__Ul'}>
            {/* <li><button id="myBtn">Sign up / Log in</button></li> */}
            <li className='Navbar__Listitems'><Link to='/userlanding'>Demo</Link></li>
          </ul>
        </nav>
      </>
    )
  }
}
