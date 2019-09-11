import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import TermsOfUse from './TermsOfUse'

describe(`TermsOfUse component`, () => {

  it('renders a TermsOfUse by default', () => {
    const wrapper = shallow(<TermsOfUse />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})