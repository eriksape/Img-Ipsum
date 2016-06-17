import { combineReducers } from 'redux'
import {reducer as form} from 'redux-form'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  form,
  routing: routerReducer,
});

export default rootReducer
