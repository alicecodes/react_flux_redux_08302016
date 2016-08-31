import 'bootstrap-loader';
import '../css/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {

	render() {
		return <div>Home</div>;
	}

}

class View extends React.Component {

	render() {
		return <div>View <a href='#/edit'>Edit</a></div>;
	}

}

class Edit extends React.Component {

	constructor(props) {
		super(props);
		this.gotoHome = this.gotoHome.bind(this);
	}

	gotoHome() {
		this.props.gotoView('#/');
	}

	render() {
		return <div>Edit <button onClick={this.gotoHome}>Home</button></div>;
	}

}

class MyRouter extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentView: window.location.hash
		};

		this.hashChange = this.hashChange.bind(this);
		this.gotoView = this.gotoView.bind(this);
	}

	hashChange() {
		this.setState({
			currentView: window.location.hash
		});
	}

	gotoView(viewName) {
		this.setState({
			currentView: viewName
		});
	}

	componentDidMount() {
		window.addEventListener('hashchange', this.hashChange);
	}

	componentWillUnmount() {
		window.removeEventListener('hashchange', this.hashChange);
	}

	render() {

		switch (this.state.currentView) {
			case '#/edit':
				return <Edit gotoView={this.gotoView} />;
			case '#/view':
				return <View />;
			default:
				return <Home />;
		}

	}

}

ReactDOM.render(<MyRouter />, document.querySelector('main'));




