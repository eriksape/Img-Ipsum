import { SubmissionError } from 'redux-form';
import { isUndefined } from 'lodash'
import raspberry from './actions'

import { authors_SET_SEARCH } from './constants'
import InitialState from './initialState'

const initialState = new InitialState

const { success, fail } = raspberry.constants

export default (state = initialState, action)=>{
  const { type, promise, payload } = action
  let index = -1;
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
    case authors_SET_SEARCH:
      return state.merge({search:payload})
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
