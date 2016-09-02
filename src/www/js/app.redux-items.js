import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

const actionTypes = keyMirror({
	INSERT_ITEM: null,
	DELETE_ITEM: null,
	FILTER_ITEMS: null
});

let lastItemId = 0;


export const deleteItems = (items, index, numOfItems) => {
	return items.slice(0, index).concat(items.slice(index + numOfItems));
};

const items = (state = [], action) => {
	switch(action.type) {
		case actionTypes.INSERT_ITEM:
			state = state.concat(action.item) ;
			break;
		case actionTypes.DELETE_ITEM:
			state = deleteItems(state, state.indexOf(state.find(item => item.id === action.item.id)));
			break;
	}
	return state;
};

const itemFilter = (state = '', action) => {
	switch(action.type) {
		case actionTypes.FILTER_ITEMS:
			state = action.filterValue;
			break;
	}
	return state;
};

const reducer = (...params) => {
	const nextState = combineReducers({ items, itemFilter })(...params);

	console.log('New State ---------------');
	console.log(JSON.stringify(nextState));

	return nextState;
};


class ItemList extends React.Component {

	render() {
		return <ul>
			{this.props.items.map(item => <li key={item.id}>{item.name}</li>)}
		</ul>;
	}	

}

ItemList.propTypes = {
	items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

class ItemForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newItemName: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onClick() {
		this.props.addItem(this.state.newItemName);

		this.setState({
			newItemName: ''
		});
	}

	render() {
		return <form>
			<label htmlFor="new-item-name">Item Name: </label>
			<input type="text" id="new-item-name" name="newItemName" value={this.state.newItemName} onChange={this.onChange} />
			<button type="button" onClick={this.onClick}>Add Item</button>
		</form>;
	}

}

ItemForm.propTypes = {
	addItem: React.PropTypes.func.isRequired
};

class ItemApp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			items: []
		};

		this.addItem = this.addItem.bind(this);
	}

	componentWillMount() {
		this.unsubscribe = this.props.store.subscribe(() => {
			this.setState(this.props.store.getState());
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	addItem(newItemName) {
		this.props.store.dispatch({
			type: actionTypes.INSERT_ITEM,
			item: {
				id: ++lastItemId,
				name: newItemName
			}
		});
	}

	render() {
		return <div>
			<h1>Item List</h1>
			<ItemList items={this.state.items} />
			<ItemForm addItem={this.addItem} />
		</div>;
	}

}

ItemApp.propTypes = {
	store: React.PropTypes.object.isRequired
};

ReactDOM.render(<ItemApp store={createStore(reducer)} />, document.querySelector('main'));






