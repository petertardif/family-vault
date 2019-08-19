import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddMemory from './AddMemory';
import Memory from '../Memory/Memory';
import { MemoryContext } from '../MemoryContext';

describe(`AddMemory component`, () => {
  it('renders empty given no items', () => {
    const wrapper = shallow(<AddMemory />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders memories when supplied with an items prop', () => {
    const testList = [
      { memory_title: 'test item 1',  },
      { memory_title: 'another test item', },
      { memory_title: 'test item number three',  },
    ]
    const wrapper = shallow(<Memory items={testList} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})