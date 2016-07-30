import { isUndefined } from 'lodash'
import actions from './actions'
import { categories_SET_SEARCH } from './constants'
import InitialState from './initialState'

const initialState = new InitialState

const { success, fail } = actions.constants

export default (state = initialState, action)=>{
  const { type, promise, payload } = action
  let index = -1;
  switch (action.type) {
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
    case 'categories_SET_FORM':
      return state.merge({
        form:payload.value
      })
      break
    case 'categories_UNSET_FORM':
      return state.merge({
        form:{}
      })
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
