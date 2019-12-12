import React from 'react';
import { Link } from 'react-router-dom'
import './Header.css'
import NotefulContext from './NotefulContext';

export default class Header extends React.Component {
  static contextType = NotefulContext; 
  render() {
    return (
      <NotefulContext.Consumer>
        {(value) => {
          return (
            <h1 className='Header_title'>
              <Link 
                to='/'
                onClick={(e) => value.clickTitle(e)}>
                Noteful
              </Link>
            </h1>
          )
        }}
      </NotefulContext.Consumer>
    )
  } 
}