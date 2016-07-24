import React from 'react'
import { render } from 'react-dom'
import {
  browserHistory,
  Router,
  Route,
  IndexRoute
} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider, intlReducer } from 'react-intl-redux'
import { addLocaleData, FormattedMessage } from 'react-intl'
import esLocaleData from 'react-intl/locale-data/es'
import enLocaleData from 'react-intl/locale-data/en'

import configureStore from './store/configureStore'
import {loadLocale} from './reducers/intl/actions'
import authorActions from './reducers/authors/actions'
import categoryActions from './reducers/categories/actions'

import App from './modules/app/components/App.jsx'
import Homepage from './modules/homepage/containers/Homepage.jsx'
import Package from './modules/app/components/Package.jsx'

import TableAuthors from './modules/authors/containers/Table.jsx'
import FormAuthors from './modules/authors/containers/Form.jsx'

import TableCategories from './modules/categories/containers/Table.jsx'
import FormCategories from './modules/categories/containers/Form.jsx'

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
store.dispatch(categoryActions.index());

//const history = syncHistoryWithStore(browserHistory, store)

require('./../semantic/semantic.less');
require('./../css/homepage.css');
render(
  <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Homepage}></Route>
        <Route path="/app" component={Package}>
          <IndexRoute component={App}></IndexRoute>
          <Route path="/app/authors" component={TableAuthors}></Route>
          <Route path="/app/authors/edit/:id" component={FormAuthors} new={false}></Route>
          <Route path="/app/authors/new" component={FormAuthors} new={true}></Route>
          <Route path="/app/categories" component={TableCategories}></Route>
          <Route path="/app/categories/edit/:id" component={FormCategories} new={false}></Route>
          <Route path="/app/categories/new" component={FormCategories} new={true}></Route>
          <Route path="/app/images"></Route>
        </Route>
      </Router>
  </Provider>,
  document.getElementById('application')
)
