import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form'
import { intlReducer as intl } from 'react-intl-redux'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  form,
  intl,
  routing: routerReducer,
});

export default rootReducer
