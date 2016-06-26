import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, hasErrors, hasError } from 'redux-form'
import classnames from 'classnames'
import { concat, reduce } from 'lodash'
import { List } from 'immutable'

const renderInput = props =>{
  if(props.error){
    console.log(props.Label,props.error)
  }
  return(
    <div className={classnames('field', {'error':props.error})}>
      <label>{props.label}</label>
      <input type="text" {...props} />
    </div>
  )
}

class ListErrors extends React.Component {
  renderList(list){
    if(list.size == 0) return null

    return list.map( (obj, key) => <div key={key}>{obj}</div> )
  }
  render(){
    return(
      <div className="ui error message">
        <div className="header">Errores:</div>
        { this.renderList(this.props.list) }
      </div>
    )
  }
}
const AuthorForm = (props) => {
  const {
    handleSubmit, pristine, reset, submitting, submitFailed,
    author, submitErrors
  } = props
  return (
    <div style={{margin: '2em 2em',padding: '2em 2em',position: 'relative'}}>
      <form onSubmit={handleSubmit} className={classnames("ui form", {'error':submitErrors.size>0})}>
        <Field name="name" label="Name" component={renderInput} type="text" placeholder="Name" />
        <Field name="site" label="Site" component={renderInput} type="text" placeholder="Site" />

          <button type="submit" className="ui button">Submit</button>
          <ListErrors  list={submitErrors} />
      </form>
    </div>
  )
}

const Form = reduxForm({
  form: 'authorForm'
})(AuthorForm)

const selector = formValueSelector('authorForm')

export default connect(
  state => ({
    formValues: selector(state, 'name', 'site'),
    submitErrors: state.form.authorForm? List(reduce( state.form.authorForm.submitErrors, (arr, obj) => _.concat(arr, obj), [] ))  :List()
  })
)(Form)
