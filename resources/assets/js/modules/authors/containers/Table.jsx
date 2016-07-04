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
    const { authors } = this.props
    if( authors.get('data').size < 1 )
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui small text loader">Cargando</div>
          </div>
          <img className="ui wireframe image" src={require('!!url!./img/short-paragraph.png')} />
        </div>
      )

    return(
      <Table
        data={authors.get('data').toJSON()}
        currPage={authors.get('current_page')}
        lastPage={authors.get('last_page')}
        changeCurrPage={this.changeCurrPage}
      />
    )
  }
})

export default connect( state => pick(state, 'authors') )(Authors)
