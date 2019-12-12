import React from 'react';
import { Link } from 'react-router-dom';
import './NoteContentPage.css';
import NotefulContext from './NotefulContext'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import 'moment-timezone';

export default class NoteContentPage extends React.Component {
  static contextType = NotefulContext;
  render() {     
    return (
      <NotefulContext.Consumer>
        {(value) => {

          return (
            <ul className='note_ul'>
              <li key={value.noteSelected[0].id} className='note_item'>
              <div className='note'>
              <Link 
                to={`/note/${value.noteSelected[0].name}`}
              >
              <h2 className='note_title'>{value.noteSelected[0].name}</h2>
              <p 
                className = 'datePre'
              >
                Date modified on<Moment interval={0} format="Do MMM YYYY" className='modified'>{value.noteSelected[0].modified}</Moment> 
              </p>
              </Link>
                <button className='note_delete'
                  onClick={()=> {value.onDelete(value.noteSelected[0].id)
                  this.props.history.push('/')}}
                >
                  <p>Remove</p>
                </button>
              </div>
              <section className='note_content'>
                <p>{value.noteSelected[0].content}</p>
              </section>
              </li>
            </ul>
          )
        }}
      </NotefulContext.Consumer>
    );
  }
}

NoteContentPage.propTypes = { 
  history: PropTypes.object.isRequired,
};