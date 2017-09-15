import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Header
 */
const Header = () =>
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

export default Header