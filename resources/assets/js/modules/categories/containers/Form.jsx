import { pick, isUndefined } from 'lodash'
import React from 'react'
import {connect} from 'react-redux'
import Form from './../components/Form.jsx'

import actions from './../../../reducers/categories/actions'

const Container =  React.createClass ({
  componentDidMount(){
    this.loadComponent(this.props)
  },
  componentDidUpdate(){
    this.loadComponent(this.props)
  },
  componentWillUnmount(){
    const { dispatch } = this.props
    dispatch({type:'categories_UNSET_FORM'})
  },

  getInitialState(){
    return {
      success:false,
      new:this.props.route.new,
      params:{}
    }
  },

  loadComponent(props){
    const { categories, params, dispatch, route } = props
    if( !route.new && categories.get('data').size > 0){
      const category = categories.get('data')
      .find(category => category.get('id') === params.id)
      if(categories.get('form').size < 1){
        if( !isUndefined(category) ){
          dispatch({
            type:'categories_SET_FORM',
            payload:{value:category.toJSON()}
          })
        } else {
          dispatch(actions.show({pathKeys:params}))
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
        dispatch(actions
          .store({body:values, promise:{reject:reject, resolve:resolve}})
        )
      } else {
        if(route.new){
          dispatch(actions
            .update({pathKeys:state.params, body:values, promise:{reject:reject, resolve:resolve}})
          )
        } else {
          dispatch(actions
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
    const { categories, route } = this.props
    const { success } = this.state
    const category = categories.get('form')
    if( route.new ){
      return <Form onSubmit={this.submit} success={success} new={true} />
    }
    if( category.size < 1 ){
      return <div>Cargando...</div>
    }
    return <Form onSubmit={this.submit} initialValues={category.toJSON()} success={success} new={false} />
  }
})

export default connect(
  state => pick(state, 'categories')
)(Container)
