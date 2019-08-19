import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Memory from './Memory'

describe(`Memory component`, () => {
  const props = {
    id: 'a',
    memory_title: 'test-class-name',
    memory_date: new Date(2018, 12, 15),
  }

  it('renders a .Memory by default', () => {
    const wrapper = shallow(<Memory />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Memory given props', () => {
    const wrapper = shallow(<Memory {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
