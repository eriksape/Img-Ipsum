import Actions from 'redux-fetch-actions'
//import authorization from './../../lib/authorization'
import { categories_SET_SEARCH } from './constants'
const authorization = () => false
const uri = '/category'
const server = ''
const options = {
  mode:        'same-origin',
  credentials: 'include',
  headers:     {
    "Content-type":     "application/json",
    'X-Requested-With': 'XMLHttpRequest',
  },
}

const action = new Actions(
  'categories',
  server,
  {
    index:{uri:uri, method:'get'},
    show:{uri:uri+'/:id', method:'get'},
    store:{uri:uri, method:'post'},
    update:{uri:uri+'/:id', method:'put'},
    destroy:{uri:uri+'/:id', method:'delete'},
  },
  authorization, options
)

export default action;
