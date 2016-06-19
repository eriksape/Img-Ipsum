import React from 'react'
import NavLink from './NavLink.jsx'
import { FormattedMessage } from 'react-intl'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><NavLink to="/app/about">
            <FormattedMessage id="app.lol" />
          </NavLink></li>
          <li><NavLink to="/app/repos">Repos</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})
