import React from 'react';

export const MemoryContext = React.createContext({
  on: '', 
  toggle: () => {},
  memories: [],
  familyMembers: [],
  addMemory: () => {},
  deleteMemory: () => {},
  addFamilyMember: () => {},
  deleteFamilyMember: () => {},
  updateMemoryList: () => {},
});