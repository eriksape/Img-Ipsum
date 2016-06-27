import { pick, isUndefined } from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
//import {reset} from 'redux-form';
import AuthorForm from './../components/Form.jsx'

import authorActions from './../../../reducers/authors/authorActions'

const Form =  React.createClass ({
  componentDidMount(){
    this.loadComponent(this.props)
  },
  componentDidUpdate(){
    this.loadComponent(this.props)
  },
  componentWillUnmount(){
    const { dispatch } = this.props
    dispatch({type:'authors_UNSET_FORM'})
  },

  loadComponent(props){
    const { authors, params, dispatch } = props

    if(authors.get('data').size > 0){

      const author = authors.get('data')
      .find(author => author.get('id') === params.id)

      if(authors.get('form').size < 1){

        if( !isUndefined(author) ){
          dispatch({
            type:'authors_SET_FORM',
            payload:{value:author.toJSON()}
          })
        } else {
          dispatch(authorActions.show({pathKeys:params}))
        }

      }

    }
  },

  submit(values, dispatch){
    const { params } = this.props

    return new Promise( (resolve, reject) =>{
      console.log(values);
      dispatch(authorActions
        .update({pathKeys:params, body:values, promise:{reject:reject, resolve:resolve}})
      )
    } )

  },

  render() {

    const { authors } = this.props

    const author = authors.get('form')

    if( author.size < 1 ){
      return <div>Cargando...</div>
    }

    return <AuthorForm onSubmit={this.submit} initialValues={author.toJSON()} />
  }
})

export default connect(
  state => pick(state, 'authors')
)(Form)
