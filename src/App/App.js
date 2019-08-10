import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import MemoryList from '../MemoryList/MemoryList';
import MemoryPage from '../MemoryPage/MemoryPage';
import { MemoryContext } from '../MemoryContext';
import Faker from 'faker';

export default class App extends Component {
  state = {
    memories: [],
    error: null,
  }
  
  componentDidMount() {
    let MemoryStore = [
      {
        id: 1,
        title: "words",
        memory_date: "Today's date",
        memory_desc: "Here is a sentence.",
        media_url: "https://via.placeholder.com/150",
        relative_id: 1,
        tag_id: 1,
        comment_id: 1,
      }
    ];

    for(var i = 0; i < 10; i++) {
      MemoryStore.push({
          id: Faker.random.uuid(),
          title: Faker.lorem.words(),
          memory_date: Faker.date.past().toDateString(),
          memory_desc: Faker.lorem.sentences(),
          media_url: "https://via.placeholder.com/150",
          relative_id: Faker.random.number(),
          tag_id: Faker.random.number(),
          comment_id: Faker.random.number(),
        }
      )
    }

    setTimeout(() => this.setState({
      memories: MemoryStore,
      })
    )
  }

  render(){
    const contextMemoriesValue = {
      memories: this.state.memories,
    }

    return (
      <main className='App'>
        <MemoryContext.Provider value={contextMemoriesValue}>
          <Switch>
            <Route 
              exact path='/' 

            />
            <Route 
              exact path='/memory' 
              render={() => 
                <MemoryList 
                  {...this.state}
                />}
            />
            <Route 
              path='/memory/:memoryId' 
              component={MemoryPage}
            />
            {/* <Route component={NotFoundPage} /> //THIS MUST BE AT THE BOTTOM OR IT WILL ALWAYS RENDER*/}
          </Switch>
        </MemoryContext.Provider>
      </main>
    )
  }
}
