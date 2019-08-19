import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Navbar from './Navbar'

describe(`Navbar component`, () => {

  it('renders a .Navbar by default', () => {
    const wrapper = shallow(<Navbar />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})