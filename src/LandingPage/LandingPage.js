import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LandingPage.css'
import '../Button/Button.css'

export default class LandingPage extends Component {
  handleClickUserLanding = () => {
    this.props.history.push('/userlanding');
  }

  render() {
    return (
      <div>
        <section className='bgimg-1'>
          <article className='caption'>
            <span className='border'>Family Vault </span>
            <a href='#header' className='chevron grow'><FontAwesomeIcon icon='chevron-down' size="3x"/></a>
          </article>
        </section>
        <header id='header' role='banner' className='landingpage-header'>
          <article className='article_wrapper'>
            <h2>Forever capture your family's precious moments through thoughts, letters, audio, images, and videos.</h2>
            <button onClick={this.handleClickUserLanding} className='Button red'>Get Started</button>
          </article>
        </header>

        {/* FEATURES OF THE APP */}
        <section className='bgimg-2 section-2'>
          <article className='article_wrapper'>
            <h2>Never miss another moment</h2> 
            <ul>
              <li>Use audio notes to capture the moments and memories</li>
              <li>Attach images or videos</li>
              <li>Write letters to deliver in the future</li>
            </ul>
          </article>
        </section>

        {/* HOW DOES IT WORK? */}
        <section className='container__section'>
          <article className='article_wrapper'>
            <h2>How it works</h2>
            <ul>
              <li>Create a vault</li>
              <li>Add in your recipients</li>
              <li>Add memories of audio or text notes, images, videos, letters, or recordings and attach to your recipient</li>
              <li>Share with others or add collaborators</li>
              <li>Determine when to reveal content with your family</li>
            </ul>
          </article>
        </section>

        {/* WHY WOULD SOMEONE USE THIS APP AND NOT OTHERS? */}
        <section className='bgimg-3'>
          <article className='article_wrapper'>
            <h2>Why Family Vault?</h2>
            <ul>
              <li>Easy to create and share only what you want</li>
              <li>Be the CEO - privately own and operate</li>
              <li>Multimedia memories to give to your children</li>
              <li>Secure and Unlimited data</li>
            </ul>
          </article>
        </section>

        <section className="container__section">
          <article className='article_wrapper'>
            <h2>Never miss another moment</h2>
            {/* <button>Sign Up Now!</button> */}
          </article>
        </section>
        
        <section className='bgimg-4'>
          <article className='article_wrapper'>
            <h2 className='LandingPage__title'>Family Vault</h2>
            <h3>Forever cherish your family's precious moments!</h3>
          </article>
        </section>
      </div>
    )
  }
}
