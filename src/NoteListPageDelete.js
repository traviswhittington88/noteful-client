import React from 'react';
import './NoteListPage.css'
import { Link } from 'react-router-dom'
import NotefulContext from './NotefulContext';

export default class NoteListPage extends React.Component {
   static contextType = NotefulContext;
   render() {
    const { notesRemaining } = this.context
    const noteItems = notesRemaining.map(note => {
      return (
        <NotefulContext.Consumer key={note.id}>
          {(value) => {
            return (
              <li key={note.id} className='Note_item'>
                <div className='Note'>
                <Link 
                  name="note/notename"
                  to={`note/${note.name}`}
                  id={note.id}
                  onClick={(e)=> value.selectNote(note.id)}
                >
                <h2 className='Note_title'>{note.name}</h2>
                </Link>
                <Link
                  name="onDelete"
                  to={`/delete/${note.name}`}
                  id={note.id}
                >
                <button className='Note_delete'
                  onClick={() => value.onDelete(note.id)}
                >
                  <p>Remove</p>
                </button>  
                </Link>    
                     
                </div>
              </li>
            )
          }}
        </NotefulContext.Consumer>
      )})
    return (

      <ul className='Note_list'>
        {noteItems}
        <button
          type="button" 
          className="addNoteButton"
        >
          <Link 
            name="addnote"
            to={'/addnote'}
          >
            Add Note
          </Link> 
        </button>
      </ul>
    )
   }
  }
