import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import actions, { setSearch } from './../../../reducers/categories/actions'
import Table from './../components/Table.jsx'
import TableLoad from './../../ui/components/TableLoad.jsx'

let timeout = null

const Container = React.createClass({
  updateTable(changed){
    const { dispatch, categories } = this.props
    const data = categories.merge(changed)
    dispatch(actions.index({
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
    const { categories } = this.props
    if( categories.get('sort') == sort )
      direction = direction=='ascending'?'asc':'desc'
    else direction = 'asc'
    this.updateTable({sort, direction})
  },
  render(){
    const { categories } = this.props
    if( categories.get('data').size < 1 )
      return <TableLoad />

    return(
      <Table
        model={categories}
        changeCurrPage={this.changeCurrPage}
        changePerPage={this.changePerPage}
        changeSearch={this.changeSearch}
        changeSort={this.changeSort}
      />
    )
  }
})

export default connect( state => pick(state, 'categories') )(Container)
