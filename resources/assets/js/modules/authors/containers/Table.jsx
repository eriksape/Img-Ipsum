import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import authorActions, {
  setSearch,
  setPerPage,
  setCurrentPage
} from './../../../reducers/authors/actions'
import Table from './../components/Table.jsx'
import TableLoad from './../../ui/components/TableLoad.jsx'

let timeout = null

const Authors = React.createClass({
  updateTable(){
    const { dispatch, authors } = this.props
    dispatch(authorActions.index({
      body:{
        page:authors.get('current_page'),
        per_page:authors.get('per_page'),
        search:authors.get('search'),
      }
    }))
  },
  changeCurrPage(currPage){
    const { dispatch } = this.props
    dispatch(setCurrentPage(currPage))
    this.updateTable()
  },
  changePerPage(){
    const { dispatch } = this.props
    const perPage = arguments[1];
    dispatch(setPerPage(perPage))
    this.updateTable()
  },
  changeSearch(event){
    const { value:search } = event.target
    const { dispatch } = this.props
    clearTimeout(timeout)
    timeout = setTimeout( (function () {
      dispatch(setSearch(search))
      dispatch(setCurrentPage(1))
      this.updateTable()
    }).bind(this), 500)
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
        changeCurrPage={this.changeCurrPage}
        changePerPage={this.changePerPage}
        changeSearch={this.changeSearch}
        isFetching={authors.get('isFetching')}
      />
    )
  }
})

export default connect( state => pick(state, 'authors') )(Authors)
