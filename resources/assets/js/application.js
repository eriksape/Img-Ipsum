import React from 'react'
import { render } from 'react-dom'
import {
  browserHistory,
  Router,
  Route,
  IndexRoute
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-intl-redux'
import {addLocaleData, FormattedMessage} from 'react-intl'
import esLocaleData from 'react-intl/locale-data/es'
import enLocaleData from 'react-intl/locale-data/en'

import configureStore from './store/configureStore'
import {loadLocale} from './reducers/intl/intlActions'
import authorActions from './reducers/authors/authorActions'

import App from './modules/app/components/App.jsx'
import Package from './modules/app/components/Package.jsx'
import TableAuthors from './modules/authors/containers/Table.jsx'
import FormAuthors from './modules/authors/containers/Form.jsx'

addLocaleData([
  ...esLocaleData,
  ...enLocaleData,
])

const messages = require('./reducers/intl/language/es.json')
const initialState = {
  intl: {
    locale: 'es',
    messages: messages
  },
}

const store = configureStore( initialState )
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(loadLocale('es'))
store.dispatch(authorActions.index());

//const history = syncHistoryWithStore(browserHistory, store)

require('./../semantic/semantic.less');
render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/app" component={Package}>
        <IndexRoute component={App}></IndexRoute>
        <Route path="/app/authors" component={TableAuthors}></Route>
        <Route path="/app/authors/edit/:id" component={FormAuthors}></Route>
        <Route path="/app/authors/new" component={FormAuthors}></Route>
        <Route path="/app/categories"></Route>
        <Route path="/app/images"></Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('application')
)
