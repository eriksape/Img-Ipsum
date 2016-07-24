import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector, hasErrors, hasError } from 'redux-form'
import classnames from 'classnames'
import { concat, reduce } from 'lodash'
import { List } from 'immutable'

const renderInput = props =>{
  const { input } = props
  if(props.error){
    console.log(props.Label,props.error)
  }
  return(
    <div className={classnames('field', {'error':props.error})}>
      <label>{input.label}</label>
      <input type="text" {...input}  />
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

class SuccessMessage extends React.Component {
  render(){
    return(
      <div className="ui success message">
        <div className="header">Formulario Guardado</div>
        <p>Todos los cambios se han guardado exitosamente.</p>
      </div>
    )
  }
}

const FormCategories = (props) => {
  const {
    handleSubmit, pristine, reset, submitting, submitFailed,
    author, submitErrors, success
  } = props
  const styleForm = classnames("ui form segment",
    {'loading': submitting},
    {'error':submitErrors.size>0},
    {'success': success}
  )
  return (
    <div style={{margin: '0em 2em',padding: '0em 2em',position: 'relative'}}>
      <form onSubmit={handleSubmit} className={styleForm}>
        <Field name="name" label="Name" component={renderInput} type="text" placeholder="Name" />
        <Field name="counter" label="Counter" component={renderInput} type="text" placeholder="Counter" />

          <button type="submit" className="ui button">Submit</button>
          <ListErrors  list={submitErrors} />
          <SuccessMessage />
      </form>
    </div>
  )
}

const Form = reduxForm({
  form: 'categoryForm'
})(FormCategories)

const selector = formValueSelector('categoryForm')

export default connect(
  state => ({
    formValues: selector(state, 'name', 'counter'),
    submitErrors: state.form.categoryForm? List(reduce( state.form.categoryForm.submitErrors, (arr, obj) => _.concat(arr, obj), [] ))  :List()
  })
)(Form)
