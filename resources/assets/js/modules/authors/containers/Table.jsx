import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import authorActions, {
  setSearch,
  setPerPage,
  setCurrentPage,
  setSort
} from './../../../reducers/authors/actions'
import Table from './../components/Table.jsx'
import TableLoad from './../../ui/components/TableLoad.jsx'

let timeout = null

const Authors = React.createClass({
  updateTable(changed){
    const { dispatch, authors } = this.props
    const data = authors.merge(changed)
    dispatch(authorActions.index({
      body:{
        page:data.get('current_page'),
        per_page:data.get('per_page'),
        search:data.get('search'),
        sort:data.get('sort'),
        direction:data.get('direction'),
      }
    }))
  },
  changeCurrPage(current_page){
    this.updateTable({current_page})
  },
  changePerPage(){
    const per_page = arguments[1];
    this.updateTable({per_page})
  },
  changeSearch(event){
    const { value:search } = event.target
    const { dispatch } = this.props
    clearTimeout(timeout)
    timeout = setTimeout( (function () {
      dispatch(setSearch(search))
      this.updateTable({search,current_page:1})
    }).bind(this), 500)
  },
  changeSort(sort, direction){
    const { authors } = this.props
    if( authors.get('sort') == sort )
      direction = direction=='ascending'?'asc':'desc'
    else direction = 'asc'
    this.updateTable({sort, direction})
  },
  render(){
    const { authors } = this.props
    if( authors.get('data').size < 1 )
      return <TableLoad />

    return(
      <Table
        data={authors.get('data').toJSON()}
        currPage={authors.get('current_page')}
        lastPage={authors.get('last_page')}
        perPage={authors.get('per_page')}
        sort={authors.get('sort')}
        direction={authors.get('direction')=='asc'?'ascending':'descending'}
        changeCurrPage={this.changeCurrPage}
        changePerPage={this.changePerPage}
        changeSearch={this.changeSearch}
        changeSort={this.changeSort}
        isFetching={authors.get('isFetching')}
      />
    )
  }
})

export default connect( state => pick(state, 'authors') )(Authors)
