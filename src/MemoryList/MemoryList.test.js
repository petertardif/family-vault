import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MemoryList from './MemoryList'
import MemoryContext from '../MemoryContext';

describe(`MemoryList component`, () => {
  const props = {
    memories: [
      {
        "id": "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        "memory_title": "Dogs",
        "date_updated": "2019-01-03T00:00:00.000Z",
        "familymember_id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        "memory_desc": "Corporis accusamus placeat.\n \rUnde."
      },
      {
        "id": "d26e0034-ffaf-11e8-8eb2-f2801f1b9fd1",
        "memory_title": "Cats",
        "date_updated": "2018-08-15T23:00:00.000Z",
        "familymember_id": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        "memory_desc": "Eos\n \rlaudantium."
      },
      {
        "id": "d26e01a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        "memory_title": "Pigs",
        "date_updated": "2018-03-01T00:00:00.000Z",
        "familymember_id": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
        "memory_desc": "Occaecati dignissimos\nvoluptatum nihil."
      },
      {
        "id": "d26e0570-ffaf-11e8-8eb2-f2801f1b9fd1",
        "memory_title": "Birds",
        "date_updated": "2019-01-04T00:00:00.000Z",
        "familymember_id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        "memory_desc": "Eum culpa odit."
      },
    ]
  }

  it('renders a .MemoryList by default', () => {
    const wrapper = shallow(<MemoryList />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders a Memory in ul for each memory in array', () => {
    const ul = shallow(<MemoryList {...props} />)
      .find('ul')
    expect(toJson(ul)).toMatchSnapshot()
  })
})
