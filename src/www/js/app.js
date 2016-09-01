import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';

const actionTypes = keyMirror({
	APPEND_ITEM: null,
	DELETE_ITEM: null,
	USER_LOGIN: null,
	USER_LOGOUT: null
});

const deleteItems = (items, index, numOfItems) => {  
	return items.slice(0, index).concat(items.slice(index + numOfItems));
};

const itemsReducer = (state = ['item 1', 'item 2'], action) => {

	let newState = state;

	switch (action.type) {
		case actionTypes.APPEND_ITEM:
			newState = state.concat(action.item);
			break;
		case actionTypes.DELETE_ITEM:
			newState = deleteItems(state, state.indexOf(state.find(item => item.id === action.itemId))  , 1);
			break;
	}	

	return newState;

};

const userReducer = (state = null, action) => {

	let newState = state;

	switch (action.type) {
		case actionTypes.USER_LOGIN:
			newState = action.user;
			break;
		case actionTypes.USER_LOGOUT:
			newState = null;
			break;
	}	

	return newState;

};

const userLoginAction = user => ({ type: actionTypes.USER_LOGIN, user });
const userLogoutAction = () => ({ type: actionTypes.USER_LOGOUT, user: null });
const appendItemAction = item => ({ type: actionTypes.APPEND_ITEM, item });
const deleteItemAction = itemId => ({ type: actionTypes.DELETE_ITEM, itemId });

class ItemList extends React.Component {

	render() {
		return <ul>{this.props.items.map(i => <li key={i}>{i}</li>)}</ul>;	
	}

}

ItemList.propTypes = {
	items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

class ItemForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			newItem: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onClick() {
		this.props.addNewItem(this.state.newItem);

		this.setState({
			newItem: ''
		});
	}

	render() {
		return <form>
			<label>New Item:</label>
			<input type="text" name="newItem"
				value={this.state.newItem} onChange={this.onChange} />
			<button type="button" onClick={this.onClick}>Add New Item</button>
		</form>;
	}

}

ItemForm.propTypes = {
	addNewItem: React.PropTypes.func.isRequired
};

class ItemsApp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			items: []
		};

		this.addNewItem = this.addNewItem.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = this.props.store.subscribe(() => {
			this.setState(this.props.store.getState());
		});

		this.setState(this.props.store.getState());
	}

	componentWillUnmount() {
		this.unsubscribe();
	}


	addNewItem(newItem) {
		this.props.store.dispatch(appendItemAction(newItem));
	}

	render() {

		return <div>
			<ItemList items={this.state.items} />
			<ItemForm addNewItem={this.addNewItem} />
		</div>;

	}

}

ItemsApp.propTypes = {
	store: React.PropTypes.object.isRequired
};

const store = createStore(combineReducers({
	items: itemsReducer, user: userReducer }));

ReactDOM.render(<ItemsApp store={store} />, document.querySelector('main'));







