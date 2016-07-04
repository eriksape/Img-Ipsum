import React from 'react'
import { Dropdown } from 'stardust'
import Paginator from  './Paginator.jsx'
import options from './../constants/table.options'
import TableLoad from './TableLoad.jsx'



export default React.createClass({
  loadChildren(){
    const { children, isFetching } = this.props
    console.log(isFetching);
    if(isFetching){
      return <TableLoad>{children}</TableLoad>
    }
    return children
  },
  render() {
    const { currPage, lastPage, perPage, changeCurrPage, changePerPage } = this.props
    return (
      <div>
        <Dropdown
          options={options}
          value={perPage}
          selection
          onChange={changePerPage}
        />
      {this.loadChildren()}
        <Paginator currPage={currPage} lastPage={lastPage}
          onChange={changeCurrPage}/>
      </div>
    )
  }
})
