"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

class HelloWorld extends React.Component {
	render() {
		return (
			<div>ES6 helllerr</div>
		)
	}
}

ReactDOM.render(<HelloWorld />, document.getElementById('app'));