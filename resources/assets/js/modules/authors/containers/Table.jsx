import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'lodash'
import authorActions from './../../../reducers/authors/authorActions'
import Table from './../components/Table.jsx'


const Authors = React.createClass({
  changeCurrPage(currPage) {
    const { dispatch } = this.props
    dispatch(authorActions.index({
      body:{
        page:currPage
      }
    }))
   },
  render(){
    const { author } = this.props
    if( author.size < 1 )
      return <div>cargando</div>

    return(
      <Table
        data={author.get('data').toJSON()}
        currentPage={author.get('current_page')}
        lastPage={author.get('last_page')}
        changeCurrPage={this.changeCurrPage}
      />
    )
  }
})

export default connect( state => pick(state, 'author') )(Authors)
