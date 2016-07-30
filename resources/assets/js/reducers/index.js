import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form'
import { intlReducer as intl } from 'react-intl-redux'
import { routerReducer } from 'react-router-redux'
import { reducer as isFetching } from 'redux-fetch-actions'

import authors from './authors/reducer'
import categories from './categories/reducer'

const rootReducer = combineReducers({
  form,
  intl,
  routing: routerReducer,
  authors,
  categories,
  isFetching
});

export default rootReducer
