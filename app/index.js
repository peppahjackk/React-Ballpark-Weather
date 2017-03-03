"use strict";
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './config/routes.js'

/* class HelloWorld extends React.Component {
	render() {
		return (
			<div>ES6 helllerr</div>
		)
	}
} */

var _APP_INFO = {
  name: 'Baseball-Weather',
  branch: 'master',
  version: '1.0'
}

ReactDOM.render(<Routes />, document.getElementById('app'));