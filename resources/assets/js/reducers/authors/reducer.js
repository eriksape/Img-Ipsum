import { SubmissionError } from 'redux-form';
import { isUndefined } from 'lodash'
import raspberry from './actions'

import {
  authors_SET_SEARCH,
  authors_SET_PER_PAGE,
  authors_SET_CURRENT_PAGE
} from './constants'
import InitialState from './initialState'

const initialState = new InitialState

const { success, fail } = raspberry.constants


export default (state = initialState, action)=>{
  const { type, promise, payload } = action
  let index = -1;
  state = state.merge({isFetching:false})
  switch (type) {
    case success.index:
      return state.merge(payload.value)
      break
    case success.store:
      promise.resolve( payload.value )
      return state
      break
    case success.update:
      index = state.get('data').findIndex( d => d.get('id')==payload.value.id )
      promise.resolve( payload.value )
      if(index >= 0) return state.mergeIn(['data', index], payload.value)
      return state
      break
    case success.show:
    case 'authors_SET_FORM':
      return state.merge({
        form:payload.value
      })
      break
    case 'authors_UNSET_FORM':
      return state.merge({
        form:{}
      })
      break
    case 'isFetching':
      return state.merge({
        isFetching:true
      })
      break
    case authors_SET_SEARCH:
      return state.merge({search:payload})
      break
    case authors_SET_PER_PAGE:
      return state.merge({per_page:payload})
      break
    case authors_SET_CURRENT_PAGE:
      return state.merge({current_page:payload})
      break
    case fail.index:
    case fail.store:
    case fail.update:
      promise.reject(new SubmissionError( payload.value ))
    default:
      return state
      break
  }
}
