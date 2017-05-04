"use strict";
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './config/routes.js'

var _APP_INFO = {
  name: 'Ballpark-Weather',
  branch: 'master',
  version: '1.0'
}

ReactDOM.render(<Routes />, document.getElementById('app'));