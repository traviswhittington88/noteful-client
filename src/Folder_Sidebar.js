import React from 'react';
import './Folder_Sidebar.css'
import { Link } from 'react-router-dom';
import NotefulContext from './NotefulContext';

export default class Sidebar extends React.Component  {
  static contextType = NotefulContext;

handle
render() {
  
  const { folders } = this.context;
  const folderItems = folders.map(folder => {
    return (
    <NotefulContext.Consumer key={folder.id}>
    {(value) => {

    return (
    <li 
      key={folder.id} 
      className='folderItem'>
        <Link 
          to={`/folder/${folder.name}`}
          id={folder.id}
          onClick={(e) => { value.selectFolder(folder.id,folder.name) }}
        >
          {folder.name}
        </Link>
        </li>
    )
      }}
      </NotefulContext.Consumer>
    )
    });

    return (
        <nav className='App__sidebar'>
            <ul className='Sidebar__ul'>
              {folderItems}
              <button
               type="button" 
               className="addFolderButton"
               >
                <Link 
                  to={'/addfolder'}
                >
                  Add Folder
                </Link> 
               </button>
            </ul>
        </nav>
    )
}
}