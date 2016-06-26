import { pick } from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
//import {reset} from 'redux-form';
import AuthorForm from './../components/Form.jsx'

const Form =  React.createClass ({
  propTypes:{
    author: React.PropTypes.object,
  },

  submit(values, dispatch){
    debugger
  },

  render() {
    const { authors, params } = this.props


    if(authors.get('data').size < 1)
      return <div>Cargando...</div>

    const author = authors.get('data')
    .find(
      author => author.get('id') === params.id
    ).toJSON()

    return <AuthorForm onSubmit={this.submit} author={author}/>
  }
})

export default connect(
  state => pick(state, 'authors')
)(Form)
