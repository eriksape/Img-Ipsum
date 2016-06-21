import React , { Component } from 'react'
import { Menu } from 'stardust'
import { FormattedMessage } from 'react-intl'
import NavLink from './../../ui/components/NavLink.jsx'

export default class MenuApp extends Component{
  render(){
    return(
      <Menu className="ui secondary pointing menu">
        <NavLink to="/app/authors" className="item">
          <FormattedMessage id="title.authors" />
        </NavLink>
        <NavLink to="/app/categories" className="item">
          <FormattedMessage id="title.categories" />
        </NavLink>
        <NavLink to="/app/images" className="item">
          <FormattedMessage id="title.images" />
        </NavLink>
        <div className="right menu">
        </div>
      </Menu>
    )
  }
}
