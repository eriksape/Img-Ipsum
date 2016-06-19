import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-intl-redux'

import configureStore from './store/configureStore'
import {loadLocale} from './reducers/intl/intlActions'
import Routes from './application.routes'

const getInitialState = () => ({
  intl: {
    locale: 'en',
    messages: {}
  }
})

const store = configureStore( getInitialState() )
const history = syncHistoryWithStore(browserHistory, store)

store.dispatch(loadLocale('es'))

//const history = syncHistoryWithStore(browserHistory, store)

require('./../semantic/semantic.less');
render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('application')
)
