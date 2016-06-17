import React from 'react'
import { render } from 'react-dom'
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  hashHistory
} from 'react-router'
import {
  syncHistoryWithStore
} from 'react-router-redux'

import {
  Provider,
  connect } from 'react-redux'

import configureStore from './store/configureStore'

import App from './components/App.jsx'
import Header from './components/Header.jsx'

//const history = syncHistoryWithStore(browserHistory, store)

require('./../semantic/semantic.less');
render(
  <Router history={hashHistory}>
    <Route path="/" component={Header}>
      <Route path="/app" component={App}>
      </Route>
    </Route>
  </Router>,
  document.getElementById('application')
)
