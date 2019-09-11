import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import FamilyMemberNav from '../FamilyMemberNav/FamilyMemberNav';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import MemoryList from '../MemoryList/MemoryList';
import MemoryFilter from '../MemoryFilter/MemoryFilter';
import MemoryPage from '../MemoryPage/MemoryPage';
import AddMemory from '../AddMemory/AddMemory';
import AddFamilyMember from '../AddFamilyMember/AddFamilyMember';
import LandingPage from '../LandingPage/LandingPage'
import UserLandingPage from '../UserLanding/UserLandingPage';
import PageNotFound from '../PageNotFound/PageNotFound';
import About from '../About/About'
import TermsOfUse from '../TermsOfUse/TermsOfUse';
import { MemoryContext } from '../MemoryContext';
import { API_BASE_URL } from '../config';
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
      fetch(`${API_BASE_URL}/memories`),
      fetch(`${API_BASE_URL}/family-members`)
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
        <MemoryContext.Provider value={contextMemoriesValue}>
          <nav>
            <Route
              path='/memorylist'
              component={FamilyMemberNav}
            />
            <Route
              path='/userlanding'
              component={FamilyMemberNav}
            />
            <Route 
              path='/family-member/:familyMemberId'
              component={FamilyMemberNav}
            />
          </nav> 
          <Navbar />
          <main className=' main'>
            
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
                  path='/family-member/:familyMemberId'
                  component={MemoryFilter}
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
                <Route
                  path='/add-family-member'
                  component={AddFamilyMember}
                />
                <Route 
                  path='/about' 
                  component={About}
                />
                <Route 
                  path='/terms' 
                  component={TermsOfUse}
                />
                {/* THIS ROUTE BELOW MUST BE AT THE BOTTOM OR IT WILL ALWAYS RENDER */}
                <Route component={PageNotFound} /> 
              </Switch>
            
          </main>
          <Footer />
        </MemoryContext.Provider>
      </>
    )
  }
}
