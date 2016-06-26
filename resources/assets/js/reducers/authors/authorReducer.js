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
    case fail.index:
    case fail.update:
      promise.reject(new SubmissionError( payload.value ))
    default:
      return state
      break
  }
}
