import React from 'react'
import NavLink from './NavLink.jsx'
import { FormattedMessage } from 'react-intl'
import { Menu } from 'stardust'

export default React.createClass({
  menu(){
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
  },
  render() {
    return (
      <div>
        {this.menu()}
        {this.props.children}
      </div>
    )
  }
})
