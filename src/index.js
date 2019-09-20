import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faArchive, faUserFriends,faPhotoVideo, faHandHoldingHeart, faCalendarAlt, faCog } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './ScrollToTop/ScrollToTop';
import App from './App/App';
import './index.css';

library.add(faChevronDown,faArchive,faUserFriends,faPhotoVideo,faHandHoldingHeart, faCalendarAlt, faCog)

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>
      <App /> 
    </ScrollToTop>
  </BrowserRouter>, 
  document.getElementById('root'));
