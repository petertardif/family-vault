import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MemoryList from '../MemoryList/MemoryList';
import MemoryStore from '../fake-data-store'

function App() {
  console.log(MemoryStore);
  return (
    <main className='App'>
      {/* <Switch> */}
        {/* <Route exact path='/' component={SampleComponent} /> */}
        {/* <Route path='/about' component={SampleComponent2} */}
        {/* <Route component={NotFoundPage} /> //THIS MUST BE AT THE BOTTOM OR IT WILL ALWAYS RENDER*/}
      {/* </Switch> */}
      <MemoryList memories={MemoryStore}/>
    </main>
  );
}

export default App;