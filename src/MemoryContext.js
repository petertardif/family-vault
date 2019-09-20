import React from 'react';

export const MemoryContext = React.createContext({
  on: '', 
  deleteOn: '',
  toggle: () => {},
  deleteToggle: () => {},
  memories: [],
  familyMembers: [],
  addMemory: () => {},
  deleteMemory: () => {},
  addFamilyMember: () => {},
  deleteFamilyMember: () => {},
  updateMemoryList: () => {},
});