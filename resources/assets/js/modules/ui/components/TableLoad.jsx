import React from 'react'
import { isUndefined } from 'lodash'

export default React.createClass({
  render() {
    if ( isUndefined(this.props.children) ){
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui small text loader">Cargando</div>
          </div>
          <img className="ui wireframe image" src={require('!!url!./img/short-paragraph.png')} />
        </div>
      )
    }
    return (
      <div className="ui segment">
        <div className="ui active inverted dimmer">
          <div className="ui small text loader">Cargando</div>
        </div>
        {this.props.children}
      </div>
    )
  }
})
