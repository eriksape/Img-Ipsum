import { pick, isUndefined } from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import AuthorForm from './../components/Form.jsx'

import authorActions from './../../../reducers/authors/actions'

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

  getInitialState(){
    return {
      success:false,
      new:this.props.route.new,
      params:{}
    }
  },

  loadComponent(props){
    const { authors, params, dispatch, route } = props
    if( !route.new && authors.get('data').size > 0){
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

  setSuccess( bValue ){
    this.setState({success:bValue})
  },
  setNew(params){
    this.setState({new:false, params:params})
  },

  submit(values, dispatch){
    const { params, route } = this.props
    const {setSuccess, setNew, state} = this
    return new Promise( (resolve, reject) =>{
      if(state.new){
        dispatch(authorActions
          .store({body:values, promise:{reject:reject, resolve:resolve}})
        )
      } else {
        if(route.new){
          dispatch(authorActions
            .update({pathKeys:state.params, body:values, promise:{reject:reject, resolve:resolve}})
          )
        } else {
          dispatch(authorActions
            .update({pathKeys:params, body:values, promise:{reject:reject, resolve:resolve}})
          )
        }
      }
    } )
    .then( p => {
      setSuccess(true)
      setNew({id:p.id})
      setTimeout( ()=>{setSuccess(false)} , 3000);
    } )
  },

  render() {
    const { authors, route } = this.props
    const { success } = this.state
    const author = authors.get('form')
    if( route.new ){
      return <AuthorForm onSubmit={this.submit} success={success} new={true} />
    }
    if( author.size < 1 ){
      return <div>Cargando...</div>
    }
    return <AuthorForm onSubmit={this.submit} initialValues={author.toJSON()} success={success} new={false} />
  }
})

export default connect(
  state => pick(state, 'authors')
)(Form)
