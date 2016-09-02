import 'bootstrap-loader';
import '../css/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class Child extends React.Component {

	render() {
		return <div>{this.context.header}</div>;
	}

}

Child.contextTypes = {
	header: React.PropTypes.string
};

class Parent extends React.Component {

	getChildContext() {
		return {
			header: 'From the parent...'
		};
	}

	render() {
		return <Child />;
	}

}

Parent.childContextTypes = {
	header: React.PropTypes.string
};

ReactDOM.render(<Parent />, document.querySelector('main'));








