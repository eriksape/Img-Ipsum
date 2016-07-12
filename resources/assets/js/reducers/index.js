import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form'
import { intlReducer as intl } from 'react-intl-redux'
import { routerReducer } from 'react-router-redux'

import authors from './authors/reducer'
const rootReducer = combineReducers({
  form,
  intl,
  routing: routerReducer,
  authors,
});

export default rootReducer
