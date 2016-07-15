import Actions from 'redux-fetch-actions'
import {
  authors_SET_SEARCH,
  authors_SET_PER_PAGE,
  authors_SET_CURRENT_PAGE,
  authors_SET_SORT
} from './constants'
//import authorization from './../../lib/authorization'
const authorization = () => false
const uri = '/author'
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
  'authors',
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

export const setSearch = search => ({
  type:authors_SET_SEARCH,
  payload:search
})

export const setPerPage = per_page => ({
  type:authors_SET_PER_PAGE,
  payload:per_page
})

export const setCurrentPage = current_page => ({
  type:authors_SET_CURRENT_PAGE,
  payload:current_page
})

export const setSort = (sort, direction) =>({
  type:authors_SET_SORT,
  payload:{
    sort,
    direction
  }
})
