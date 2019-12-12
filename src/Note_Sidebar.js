import React from 'react';
import './Note_Sidebar.css';
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

export default class NoteSideBar extends React.Component {
  constructor(props) {
    super(props)
 
  }
    static contextType = NotefulContext;
    
    render() {
    return(
    <NotefulContext.Consumer>
      {(value) => {
      return (
        <nav className='App__sidebar'>
          <div className='NoteContentPageNav'>
            <button 
              className='NavCircleButton'
              onClick={() => {this.props.history.goBack()}}
            >
              Back
            </button>
            <h3 className='folder-name'>{value.folderOfNote}</h3>
          </div>
        </nav>
        )
      }}
      </NotefulContext.Consumer>
        
        )
    }   
}

NoteSideBar.propTypes = {
  history: PropTypes.object.isRequired
};


