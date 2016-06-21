import React , { Component } from 'react'
import { Menu } from 'stardust'
import { FormattedMessage } from 'react-intl'
import NavLink from './../../ui/components/NavLink.jsx'

export default class MenuApp extends Component{
  render(){
    return(
      <Menu className="ui secondary pointing menu">
        <NavLink to="/app/about" className="item">
          <FormattedMessage id="app.lol" />
        </NavLink>
        <NavLink to="/app/repos" className="item">Repos</NavLink>
        <div className="right menu">
        </div>
      </Menu>
    )
  }
}
