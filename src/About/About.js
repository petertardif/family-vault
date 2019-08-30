import React, { Component } from 'react'
import '../Button/Button.css'

export default class About extends Component {
  handleClickGoBack = () => {
    this.props.history.push('/');
  } 

  render() {
    return (
      <>
        <section className='container__top'>
          <article className='article_wrapper'>
            <h2>- Our Mission -</h2> 
            <h4>To provide the opportunity to remember the little things</h4>
            <p>
              Life is not always about the big moments. My wife and I came up with this idea because we often found ourselves saying "we have to record Tanner saying this" or "before he grows out of this, we have to write this down".  More often than not, we never got around to doing this. With this application, recording these moments is easy and there is no excuse not to.  
            </p>
            <p>
            Family Vault was created because we want to solve this very problem. Our mission is to make it easy to share the history of your family by going beyond the photo album, slideshow, or videos. Today we provide the most actionable memory app in the world and want to make this freely available to as many people as possible (not just the top 5%).
            </p>
            <button onClick={this.handleClickGoBack} className='Button blue'>Back</button>
          </article>
        </section>
      </>
    )
  }
}
