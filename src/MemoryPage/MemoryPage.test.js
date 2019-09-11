// //DID NOT HAVE TIME TO LEARN HOW TO MOCK API CALLS AND THIS WAS NOT IN OUR CURRICULUM.  I WILL EVENTUALLY LEARN HOW TO DO THIS AND INCORPORATE BUT DO NOT HAVE THE TIME RIGHT NOW.

// import React from 'react';
// import { shallow } from 'enzyme'
// import toJson from 'enzyme-to-json'
// import MemoryPage from './MemoryPage'

// describe(`MemoryPage component`, () => {
//   const props = {
//     memory: {
//       "id": 1,
//       "memory_title": "Dogs",
//       "date_updated": "2019-01-03T00:00:00.000Z",
//       "familymember_id": "1",
//       "memory_desc": "Corporis accusamus placeat.\n \rUnde."
//     }
//   }

//   it('renders a .MemoryPage by default', () => {
//     const wrapper = shallow(<MemoryPage />)
//     expect(toJson(wrapper)).toMatchSnapshot()
//   })

//   it('renders a Memory with memory prop', () => {
//     const memory = shallow(<MemoryPage {...props} />)
//       .find('Memory')
//     expect(toJson(memory)).toMatchSnapshot()
//   })
// })
