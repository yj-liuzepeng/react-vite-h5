/*
 * @Author: lzp
 * @Date: 2022-11-06 22:06:35
 * @Description: file content
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import 'lib-flexible/flexible'

import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

