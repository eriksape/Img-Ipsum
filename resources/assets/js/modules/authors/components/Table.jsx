import React, { Component } from 'react'
import { Table } from 'stardust'
import { Link } from 'react-router'
import options from './../../ui/constants/table.options'

import DataTable from  './../../ui/components/DataTable.jsx'

export default class AuthorTable extends Component{
  options(data){
    const edit = '/app/authors/edit/'+data.id
    return(
      <div className="mini ui compact basic icon buttons">
        <Link to={edit} className="mini ui compact button">
          <i className="edit icon" />
        </Link>
      </div>
    )
  }
  render(){
    const { data, changeCurrPage, changePerPage, currPage, lastPage, perPage, isFetching } = this.props
    return(
    <div className="ui segment">
      <h3 className="ui left floated header">Autores</h3>
      <Link to={'google.com'} className="tiny ui right floated compact button">
        <i className="edit icon" />
        Nuevo
      </Link>
      <div className="ui clearing divider"></div>
      <p></p>

      <DataTable currPage={currPage} lastPage={lastPage} perPage={perPage}
        changeCurrPage={changeCurrPage} changePerPage={changePerPage} isFetching={isFetching}>
        <Table className='selectable' data={data} onSelectRow={this.handleSelectRow}>
          <Table.Column dataKey='name' />
          <Table.Column dataKey='site' />
          <Table.Column dataKey='options' cellRenderer={ this.options } />
        </Table>
      </DataTable>
    </div>
    )
  }
}
