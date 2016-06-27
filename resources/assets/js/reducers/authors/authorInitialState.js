import {Map, Record} from 'immutable'

var InitialState = Record({
  total:1,
  per_page:10,
  current_page:1,
  last_page:1,
  next_page_url:null,
  prev_page_url:null,
  from:null,
  to:null,
  data:Map([]),
  form:Map({})
})

export default InitialState
