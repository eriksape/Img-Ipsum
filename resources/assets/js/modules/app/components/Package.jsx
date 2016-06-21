import React from 'react'
import Menu from './Menu.jsx'

export default React.createClass({
  render() {
    const { children } = this.props
    return (
      <div>
        <Menu />
        { children }
      </div>
    )
  }
})
