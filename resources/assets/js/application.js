import React from 'react'
import { render } from 'react-dom'
import App from './components/App.jsx'
require('./../semantic/src/semantic.less');
render(
  <App /> ,
  document.getElementById('application')
)
