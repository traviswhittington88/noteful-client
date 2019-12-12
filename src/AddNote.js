import React from 'react';
import NotefulContext from './NotefulContext';
import './AddNote.css';
import PropTypes from 'prop-types';

class AddNote extends React.Component {
  
    static contextType = NotefulContext;

    constructor(props) {
        super(props)
        this.noteNameInput = React.createRef();
        this.folderOfNoteInput = React.createRef();
        this.noteContentInput = React.createRef();
    }

    handleSubmit(event) {
        event.preventDefault();
        const noteName = this.noteNameInput.current.value;
        const folderOfNote = this.folderOfNoteInput.current.value;
        const noteContent = this.noteContentInput.current.value;
        this.context.onAddNote(noteName,folderOfNote,noteContent);
        this.props.history.goBack();
    }

    render() {
        
        return (
            <div className='addNoteApp'>
                <NotefulContext.Consumer>
                    {(value) => {
                        console.log('path',value.path)
                        const folderOptions = value.folders.map(folder => 
                            <option key={folder.id} 
                            onChange={(e) => this.handleOptionChange(e)}
                            >
                            {folder.name}</option>);
                        return(
                            <form className='addNoteForm' onSubmit={(e) => {this.handleSubmit(e) }}> 
                              <h3>Add a note below!</h3>
                              <label htmlFor='noteName'>Note Name:</label>
                              <input 
                                type='text'
                                id="noteName" 
                                name='noteName' 
                                aria-label="Name of note"
                                aria-required="true"
                                aria-describedby="nnError"
                                ref={this.noteNameInput} 
                                placeholder="My New Note" 
                                required
                                />
                                <div
                                className="errorMessage"
                                id="nnError">
                                    Please enter a note name
                                </div>
                              <label htmlFor='folderOfNote'>Folder name of note:</label>
                              <select ref={this.folderOfNoteInput}>
                                {folderOptions}
                              </select>
                              <label htmlFor='noteContent'>Note Content:</label>
                              <textarea ref={this.noteContentInput} required></textarea>
                              <input type="submit" defaultValue="Submit" className="submitButton"></input>
                              <div id="noteNameConstraint">Must enter a note name!</div>
                            </form>
                        )
                    }} 
                </NotefulContext.Consumer>
            </div>
        )
    }
}

export default AddNote;

AddNote.propTypes = {
    history: PropTypes.object.isRequired,
}