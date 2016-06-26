import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import classnames from 'classnames'

const renderInput = props =>{
  return(
    <div className={classnames('field', {'error':props.error})}>
      <label>{props.label}</label>
      <input type="text" {...props} />
    </div>
  )
}



class AuthorForm extends Component {
  render() {
    const { handleSubmit, author:{name, site} } = this.props
    return (
      <div style={{margin: '2em 2em',padding: '2em 2em',position: 'relative'}}>
        <form onSubmit={handleSubmit} className="ui form">
          <Field
            label="Name"
            name="name"
            component={renderInput}
            type="text"
            defaultValue={name}
            />


          <Field
            label="Site"
            name="site"
            component={renderInput}
            defaultValue={site}
            type="text"/>

          <button type="submit" className="ui button">Submit</button>
        </form>
      </div>
    )
  }
}

export default connect()(reduxForm({
  form: 'myForm'
})(AuthorForm))
