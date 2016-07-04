import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import authorActions from './../../../reducers/authors/authorActions'
import Table from './../components/Table.jsx'
import TableLoad from './../../ui/components/TableLoad.jsx'

const Authors = React.createClass({
  changeCurrPage(currPage) {
    const { dispatch, authors } = this.props
    const perPage = authors.get('per_page')
    dispatch(authorActions.index({
      body:{
        page:currPage,
        per_page:perPage,
      }
    }))
   },
   changePerPage(){
     const { dispatch, authors } = this.props
     const currPage = authors.get('current_page')
     const perPage = arguments[1];
     dispatch(authorActions.index({
       body:{
         page:currPage,
         per_page:perPage,
       }
     }))
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
        isFetching={authors.get('isFetching')}
      />
    )
  }
})

export default connect( state => pick(state, 'authors') )(Authors)
