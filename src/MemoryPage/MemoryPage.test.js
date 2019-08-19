import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MemoryPage from './MemoryPage'

describe(`MemoryPage component`, () => {
  const props = {
    note: {
      "id": 1,
      "memory_title": "Dogs",
      "date_updated": "2019-01-03T00:00:00.000Z",
      "familymember_id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      "memory_desc": "Corporis accusamus placeat.\n \rUnde."
    }
  }

  it('renders a .MemoryPage by default', () => {
    const wrapper = shallow(<MemoryPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Memory with memory prop', () => {
    const note = shallow(<MemoryPage {...props} />)
      .find('Memory')
    expect(toJson(memory)).toMatchSnapshot()
  })
})
