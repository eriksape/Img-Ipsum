import React, { Component } from 'react'
import { Table } from 'stardust'
import { Link } from 'react-router'

import Paginator from  './../../ui/components/Paginator.jsx'

export default class AuthorTable extends Component{
  options(data){
    const edit = '/app/authors/edit/'+data.id
    return(
      <div className="ui small basic icon buttons">
        <Link to={edit} className="ui button">
          <i className="edit icon" />
        </Link>
      </div>
    )
  }
  render(){
    const { data, changeCurrPage, currPage, lastPage } = this.props
    return(
      <div>
        <Table className='selectable' data={data} onSelectRow={this.handleSelectRow}>
          <Table.Column dataKey='name' />
          <Table.Column dataKey='site' />
          <Table.Column dataKey='options' cellRenderer={ this.options } />
        </Table>
        <Paginator currPage={currPage} lastPage={lastPage}
          onChange={changeCurrPage}/>
    </div>
    )
  }
}
