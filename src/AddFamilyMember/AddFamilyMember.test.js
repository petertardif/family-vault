import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddFamilyMember from './AddFamilyMember'

describe(`AddFamilyMember component`, () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<AddFamilyMember />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
