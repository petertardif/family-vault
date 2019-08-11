import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <header role="banner">
          <h1>Family Vault</h1>
          <h4>Forever capture your family's precious moments through thoughts, letters, audio, images, and videos.</h4>
          <Button tag={Link} to='/userlanding' type='button' className='LandingPage_tour-button'
          >Tour a Vault!</Button>
        </header>

        {/* FEATURES OF THE APP */}
        <section>
          <h2>Never miss another moment</h2> 
          <ul>
            <li>Use audio notes to capture the moments and memories</li>
            <li>Attach images or videos</li>
            <li>Write letters to deliver in the future</li>
          </ul>
        </section>

        {/* HOW DOES IT WORK? */}
        <section>
          <h2>How it works</h2>
          <ul>
            <li>Create a vault</li>
            <li>Add in your recipients</li>
            <li>Add memories of audio or text notes, images, videos, letters, or recordings and attach to your recipient</li>
            <li>Share with others or add collaborators</li>
            <li>Determine when to reveal content with your family</li>
          </ul>
        </section>

        {/* WHY WOULD SOMEONE USE THIS APP AND NOT OTHERS? */}
        <section>
          <h2>Why Family Vault?</h2>
          <ul>
            <li>Easy to create and share only what you want</li>
            <li>Be the CEO - privately own and operate</li>
            <li>Multimedia memories to give to your children</li>
            <li>Secure and Unlimited data</li>
          </ul>
        </section>

        <section>
          <h2>Never miss another moment</h2>
          <button>Sign Up Now!</button>
        </section>
        
        <section>
          <img src="" alt="" />
          <h2>Family Vault</h2>
          <h3>Forever cherish your family's precious moments!</h3>
        </section>
      </div>
    )
  }
}
