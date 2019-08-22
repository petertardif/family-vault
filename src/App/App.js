import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MemoryList from '../MemoryList/MemoryList';
import MemoryPage from '../MemoryPage/MemoryPage';
import AddMemory from '../AddMemory/AddMemory';
import LandingPage from '../LandingPage/LandingPage'
import UserLandingPage from '../UserLanding/UserLandingPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import { MemoryContext } from '../MemoryContext';
import './App.css';

export default class App extends Component {
  state = {
    on: false,
    memories: [],
    familyMembers: [],
    error: null,
  }
  
  componentDidMount() {

    Promise.all([
      fetch(`https://agile-fortress-94521.herokuapp.com/api/memories`),
      fetch(`https://agile-fortress-94521.herokuapp.com/api/family-members`)
    ])
      .then(([memoriesResponse,familymembersResponse]) => {
        if(!memoriesResponse.ok) {
          return memoriesResponse.json().then(error => Promise.reject(error))
        }
        if (!familymembersResponse) {
          return familymembersResponse.json().then(error => Promise.reject(error))
        }
        return Promise.all([
          memoriesResponse.json(),
          familymembersResponse.json(),
        ])
      })
      .then(([memories,familyMembers]) => {
        this.setState({ memories, familyMembers})
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      })
  }

  handleAddFamilyMember = familymember => {
    this.setState({
      familyMembers: [
        ...this.state.familyMembers,
        familymember
      ]
    })
  }

  handleAddMemory = memory => {
    this.setState({
      memories: [
        ...this.state.memories,
        memory
      ]
    })
  }

  handleUpdateMemoryList = memory => {
    this.setState({
      memories: memory
    })
  }

  handleDeleteMemory = memoryId => {
    this.setState({
      memories: this.state.memories.filter(memory => memory.id !== memoryId)
    })
  }

  toggle = () => {
    this.setState({
      on: !this.state.on
    });
  };

  render(){
    const contextMemoriesValue = {
      on: this.state.on,
      toggle: this.toggle,
      memories: this.state.memories,
      familyMembers: this.state.familyMembers,
      addMemory: this.handleAddMemory,
      deleteMemory: this.handleDeleteMemory,
      addFamilyMember: this.handleAddFamilyMember,
      deleteFamilyMember: this.handleDeleteFamilyMember,
      updateMemoryList: this.handleUpdateMemoryList,
    }

    return (
      <>
        <Navbar />
        <main className=' main'>
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
              {/* THIS ROUTE BELOW MUST BE AT THE BOTTOM OR IT WILL ALWAYS RENDER */}
              <Route component={PageNotFound} /> 
            </Switch>
          </MemoryContext.Provider>
        </main>
        <Footer />
      </>
    )
  }
}
