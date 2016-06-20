import React, { Component } from 'react'
import {
  Router,
  Route,
  IndexRoute
} from 'react-router'
import { isEmpty } from 'lodash'

import App from './components/App.jsx'
import Header from './components/Header.jsx'

export default class routes extends Component {
  render(){
    const { history, store } = this.props
    if(isEmpty(store.getState().intl.messages))
      return(<p>Cargando</p>)
    return(
      <Router history={history}>
        <Route path="/app" component={Header}>
          <IndexRoute component={App}></IndexRoute>
          <Route path="/app/about"></Route>
          <Route path="/app/repos"></Route>
        </Route>
      </Router>
    )
  }
}
