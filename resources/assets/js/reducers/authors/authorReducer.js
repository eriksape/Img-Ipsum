import { SubmissionError } from 'redux-form';
import { isUndefined } from 'lodash'
import raspberry from './authorActions'

import InitialState from './authorInitialState'

const initialState = new InitialState

const { success, fail } = raspberry.constants

export default (state = initialState, action)=>{
  const { type, promise, payload } = action
  switch (type) {
    case success.index:
      return state.merge(payload.value)
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
    case fail.index:
    case fail.update:
      promise.reject(new SubmissionError( payload.value ))
    default:
      return state
      break
  }
}
