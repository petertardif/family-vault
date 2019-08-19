import React from 'react';

export const MemoryContext = React.createContext({
  memories: [],
  familyMembers: [],
  addMemory: () => {},
  deleteMemory: () => {},
  addFamilyMember: () => {},
  deleteFamilyMember: () => {},
  updateMemoryList: () => {},
});