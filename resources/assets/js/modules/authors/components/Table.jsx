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
    const {
      changeCurrPage,
      changePerPage,
      changeSearch,
      changeSort,
      model,
    } = this.props
    return(

    <div className="ui segment">
      <h3 className="ui left floated header">Autores</h3>
      <Link to={'/app/authors/new'} className="tiny ui right floated compact button">
        <i className="add circle icon" ></i>
        Nuevo
      </Link>
      <div className="ui clearing divider"></div>
      <p></p>

      <DataTable
        currPage={model.get('current_page')}
        lastPage={model.get('last_page')}
        perPage={model.get('per_page')}
        isFetching={model.get('isFetching')}
        changeCurrPage={changeCurrPage}
        changePerPage={changePerPage}
        changeSearch={changeSearch}
      >
        <Table
          className='selectable'
          data={model.get('data').toJSON()}
          onSelectRow={this.handleSelectRow}
          sort={model.getSorting()}
          onSortChange={changeSort}
        >
          <Table.Column dataKey='name' />
          <Table.Column dataKey='site' />
          <Table.Column dataKey='options' cellRenderer={ this.options } />
        </Table>
      </DataTable>
    </div>
    )
  }
}
