import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MemoryList from '../MemoryList/MemoryList';
import MemoryPage from '../MemoryPage/MemoryPage';
import AddMemory from '../AddMemory/AddMemory';
import LandingPage from '../LandingPage/LandingPage'
import UserLandingPage from '../UserLanding/UserLandingPage';
import { MemoryContext } from '../MemoryContext';
import Faker from 'faker';
import './App.css';

export default class App extends Component {
  state = {
    memories: [],
    familyMember: [],
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
        familymember_id: 1,
        tag_id: 1,
        comment_id: 1,
        date_updated: "Tue Aug 08 2019",
      }
    ];

    let FamilyMemberStore = [
      {
        id: 1,
        first_name: "Lenny",
        last_name: "Tardif",
      }
    ];

    for(var i = 0; i < 10; i++) {
      MemoryStore.push({
          id: Faker.random.uuid(),
          title: Faker.lorem.words(),
          memory_date: Faker.date.past().toDateString(),
          memory_desc: Faker.lorem.sentences(),
          media_url: "https://via.placeholder.com/150",
          familymember_id: Faker.random.number(),
          tag_id: Faker.random.number(),
          comment_id: Faker.random.number(),
          date_updated: Faker.date.recent().toDateString(),
        }
      )
      FamilyMemberStore.push({
        id: Faker.random.number(),
        first_name: Faker.name.firstName(),
        last_name: Faker.name.lastName(),
      })
    }

    setTimeout(() => this.setState({
      memories: MemoryStore,
      familyMember: FamilyMemberStore,
      })
    )
  }

  render(){
    const contextMemoriesValue = {
      memories: this.state.memories,
      familyMember: this.state.familyMember,
    }

    return (
      <>
        <Navbar />
        <main className='App'>
          <MemoryContext.Provider value={contextMemoriesValue}>
            <Switch>
              <Route 
                exact path='/' 
                component={LandingPage}
              />
              <Route 
                path='/userlanding' 
                component={UserLandingPage}
              />
              <Route 
                exact path='/memorylist' 
                render={() => 
                  <MemoryList 
                    {...this.state}
                  />}
              />
              <Route 
                path='/memory/:memoryId' 
                component={MemoryPage}
              />
              <Route 
                path='/add-memory' 
                render={() => 
                  <AddMemory
                    {...this.state}
                  />}
              />
              {/* <Route component={NotFoundPage} /> //THIS MUST BE AT THE BOTTOM OR IT WILL ALWAYS RENDER*/}
            </Switch>
          </MemoryContext.Provider>
        </main>
        <Footer />
      </>
    )
  }
}
