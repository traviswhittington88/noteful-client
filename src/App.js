import React from 'react';
import { Route } from 'react-router-dom'
import NoteListPage from './NoteListPage'
import NoteListPageAlt from './NoteListPageAlt'
import Header from './Header'
import Sidebar from './Folder_Sidebar'
import NoteSidebar from './Note_Sidebar'
import './dummy-store'
import './App.css';
import NoteContentPage from './NoteContentPage';
import NotefulContext from './NotefulContext'
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import ErrorBoundary from './ErrorBoundary';

class App extends React.Component {
 constructor(props) {
   super(props)
   this.state = {
      folders: [],
      notes: [],
      newNotes: [],
      notesInFolder: [],
      newFolders: [],
      error: null,
      noteSelected: [{}],
      folderOfNote: "",
      folderName:'',
    }
  }

handleAddNote = (noteName, folderName, content) => {
    const folderOfNote = this.state.newFolders.filter(folder => {return folder.name ===  folderName})
    const folderId = folderOfNote[0].id;  

    const obj = {
      method: 'POST',
      body: JSON.stringify({name: noteName, folderId: folderId, content: content}),
      headers: {
        'Content-Type': 'application/json'
      }
    } 
    fetch(`http://localhost:9090/notes`,obj)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json();
     
    })
    .then(newNote => {  const noteList = this.state.newNotes.map(note => {return note})
                noteList.push(newNote)
                const notesInFolderList = this.state.notesInFolder.map(note => {return note})
                notesInFolderList.push(newNote)
                this.setState({notesInFolder: notesInFolderList})
                this.setState({ newNotes: noteList })
               
      }).catch(error => this.setState({error:error.message})) 
      }

  handleAddFolder = (folderName) => { 
    const obj = {
      method: 'POST',
      body: JSON.stringify({name: folderName}),
      headers: {
        'Content-Type': 'application/json',
      }
    }
    
    fetch(`http://localhost:9090/folders`,obj)
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json();
    })
    .then(folder => {
      console.log(folder);
      folder.name = folderName
      const newFoldersList = this.state.newFolders.map(folder => {return folder});
      newFoldersList.push(folder);
      this.setState({newFolders:newFoldersList})
      
      })
    .catch(error => {this.setState({error: error.message})})

    fetch('http://localhost:9090/folders')
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(folders => console.log(folders))
    .catch(err => {this.setState({error: err.message})})
    console.log(this.state.folders);
  
  }
  
  handleClickedFolder = (folderId, name) => {
    const newNoteList = this.state.newNotes.filter(note => note.folderId === folderId)
    this.setState({ notesInFolder:newNoteList, folderName:name})
  }

  handleClickedTitle = () => {
    fetch('http://localhost:9090/notes')
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(notes => this.setState({newNotes:notes}))
    .catch(err => {this.setState({error: err.message})})
  } 

  handleClickedNote = (noteId) => {
   
    const noteItem= this.state.newNotes.filter(note => note.id === noteId)
    this.setState({noteSelected:noteItem})
    const folderIdOfNote = noteItem[0].folderId;
    const folderOfNote = this.state.newFolders.filter(folder => folder.id === folderIdOfNote)
                        .map(item => {return item.name} )
    const folderName = folderOfNote.join();
    this.setState({folderOfNote: folderName});
  }
 
  deleteNote = (noteId) => {
    console.log('deleteNote clicked')
    const notesRemaining = this.state.newNotes.filter(note =>  note.id !== noteId)
    this.setState({newNotes: notesRemaining, notesInFolder: notesRemaining });

  }

  updatePath(path) {
    this.setState({path})
  }

  componentDidMount() {
    
    fetch('http://localhost:9090/folders')
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(folders => this.setState({ folders:folders, newFolders: folders }))
    .catch(err => {this.setState({error: err.message})})

    fetch('http://localhost:9090/notes')
    .then(res => {
      if(!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .then(notes => this.setState({notes: notes, newNotes: notes }))
    .catch(err => {this.setState({error: err.message})})
  }
  render() {
    const contextValue = {
      folders: this.state.newFolders,
      notes: this.state.newNotes,
      notesInFolder: this.state.notesInFolder,
      noteSelected: this.state.noteSelected,
      folderOfNote: this.state.folderOfNote,
      selectNote: this.handleClickedNote,
      selectFolder: this.handleClickedFolder,
      clickTitle: this.handleClickedTitle,
      onDelete: this.deleteNote,
      onAddFolder: this.handleAddFolder,
      onAddNote: this.handleAddNote,
      path: this.state.path,
      updatePath: this.updatePath,
    }
  
  return (
    <div className="App">
    <ErrorBoundary>
    <NotefulContext.Provider value={ contextValue }>
    <Route 
      exact
      path='/'
      render={() =>
        <React.Fragment>
          <Sidebar />
          <div className='column__wrapper'>
          <header className='App__header'>
            <Header/>
          </header>
          <main className='App__main'> 
            <NoteListPage/>
          </main>
          </div>
        </React.Fragment> }
      />

    <Route
        exact
        path='/note/:notename'
        render={({ history }) => 
          <React.Fragment>
            <NoteSidebar history={ history }/>
             <div className='column__wrapper'>
              <header className='App__header'>
                <Header/>
              </header>
              <main className='App__main'>
                <NoteContentPage history={ history }/>
              </main>
              </div>
          </React.Fragment> }
    />

      <Route 
      path='/folder/:foldername'
      render={( { match }) =>
        <React.Fragment>
          <Sidebar />
          <div className='column__wrapper'>
          <header 
            className='App__header' 
          >
          <Header/>
          </header>
          <main className='App__main'>
          <NoteListPageAlt/>
          </main>
          </div>
        </React.Fragment> }
      />
    
      <Route
        path='/:folderId/note/:notename'
        render={( { history }) => 
          <React.Fragment>
            <NoteSidebar history={ history } />
             <div className='column__wrapper'>
              <header className='App__header'>
                <Header
                  clickTitle={this.handleClickedTitle} 
                />
              </header>
              <main className='App__main'>
                <NoteContentPage history={ history }/>
              </main>
              </div>
          </React.Fragment> }
      />

      <Route
        path='/addfolder'
        render={({ history }) => 
          <React.Fragment>
            <AddFolder history={ history } />
          </React.Fragment>
        }
      />

      <Route 
        path='/addnote'
        render={({ history }) => 
          <React.Fragment>
            <AddNote history={ history } />
          </React.Fragment>
        }
        />

      </NotefulContext.Provider>
      </ErrorBoundary>   
    </div> 
  )
 }
}

export default App;    
