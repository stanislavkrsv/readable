import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

/**
 * Header
 */
class Header extends Component {
  render(){
    return(
      <header className="header">
        <div className="header__wrapper">
          <div className="header__logo">
            <NavLink to="/" exact>Readable</NavLink>
          </div>
          <div className="header__button">
            <NavLink to="/new" className="btn btn--action">Create Post</NavLink>
          </div>
        </div>
      </header>
    )
  }
}

export default Header