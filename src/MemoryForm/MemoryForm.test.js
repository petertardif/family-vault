import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MemoryForm from './MemoryForm'

describe(`MemoryForm component`, () => {
  const props = {
    className: 'test-class-name',
    children: <p>test children</p>,
    'data-other': 'test-other-prop'
  }

  it('renders a form.MemoryForm by default', () => {
    const wrapper = shallow(<MemoryForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the MemoryForm given props', () => {
    const wrapper = shallow(<MemoryForm {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
