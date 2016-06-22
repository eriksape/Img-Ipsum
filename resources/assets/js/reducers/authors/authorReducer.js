import { isUndefined } from 'lodash'
import raspberry from './authorActions'

import initialState from './authorInitialState'

const { success, fail } = raspberry.constants

export default (state = initialState, action)=>{
  switch (action.type) {
    case success.index:
      return state.merge(action.payload.value)
      break
    case fail.index:
    default:
      return state
      break
  }
}
