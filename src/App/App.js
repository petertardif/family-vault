import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MemoryList from '../MemoryList/MemoryList';
import MemoryStore from '../fake-data-store';

function App() {
  return (
    <main className='App'>
      <Switch>
        <Route 
          exact path='/' 
          render={() => 
            <MemoryList 
              memories={MemoryStore}
            />} />
        {/* <Route path='/about' component={SampleComponent2} */}
        {/* <Route component={NotFoundPage} /> //THIS MUST BE AT THE BOTTOM OR IT WILL ALWAYS RENDER*/}
      </Switch>
    </main>
  );
}

export default App;