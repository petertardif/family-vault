import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { MemoryContext } from '../MemoryContext';
import './FamilyMemberNav.css';

export default class FamilyMemberNav extends Component {
    static contextType = MemoryContext;

    handleClickAddFamilyMember = () => {
      this.props.history.push('/add-family-member');
    }

    render() {
      const { familyMembers = [] } = this.context;

      return (
        <section className='NoteListNav'>
          <ul className='NoteListNav__Ul' aria-live='polite'>
            {familyMembers.map(familyMember =>
              <li className='NoteListNav__Listitems' key={familyMember.id}>
                <NavLink 
                  className='NoteListNav__folder-link' 
                  to={`/family-member/${familyMember.id}`}>{familyMember.first_name}
                </NavLink>
              </li>
            )}
            <div className='buttons'>
            <button onClick={this.handleClickAddFamilyMember} className='NotelistCircleButton'>+</button>
          </div>
          </ul>
          
        </section>
      )
    }
}