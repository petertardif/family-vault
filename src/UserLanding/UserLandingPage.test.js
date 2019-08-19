import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import UserLandingPage from './UserLandingPage'

describe(`UserLandingPage component`, () => {

  it('renders a .UserLandingPage by default', () => {
    const wrapper = shallow(<UserLandingPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
