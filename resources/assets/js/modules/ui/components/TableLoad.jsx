import React from 'react'

export default React.createClass({
  render() {
    return (
      <div className="ui segment">
        <div className="ui active inverted dimmer">
          <div className="ui small text loader">Cargando</div>
        </div>
        <img className="ui wireframe image" src={require('!!url!./img/short-paragraph.png')} />
      </div>
    )
  }
})
