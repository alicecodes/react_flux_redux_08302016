import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';

const actionTypes = keyMirror({
	APPEND_ITEM: null,
	DELETE_ITEM: null,
	USER_LOGIN: null,
	USER_LOGOUT: null
});

const deleteItems = (items, index, numOfItems) => {  
	return items.slice(0, index).concat(items.slice(index + numOfItems));
};

const itemsReducer = (state = [], action) => {

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

const combine = (reducers) => {
	return (state = {}, action) => {
		return Object.keys(reducers).reduce((newState, key) => {
			newState[key] = reducers[key](newState[key], action);
			return newState;
		}, state);
	};
};

const reducer = (...params) => {

	const newState = combine({ items: itemsReducer, user: userReducer })(...params);

	console.log('New State -----');
	console.log(JSON.stringify(newState));	

	return newState;
};




// const reducer = (state = { items: [], user: null }, action) => {

// 	let newState = state;

// 	newState.items = itemsReducer(newState.items, action);
// 	newState.user = userReducer(newState.user, action);

// 	console.log('New State -----');
// 	console.log(JSON.stringify(newState));

// 	return newState;
// };

const userLoginAction = user => ({ type: actionTypes.USER_LOGIN, user });
const userLogoutAction = () => ({ type: actionTypes.USER_LOGOUT, user: null });
const appendItemAction = item => ({ type: actionTypes.APPEND_ITEM, item });
const deleteItemAction = itemId => ({ type: actionTypes.DELETE_ITEM, itemId });

[
	userLoginAction({ username: 'bob' }),
	appendItemAction({ id: 1, name: 'Item 1'}),
	appendItemAction({ id: 2, name: 'Item 2'}),
	deleteItemAction(1),
	appendItemAction({ id: 3, name: 'Item 3'}),
	userLogoutAction()
].reduce(reducer, undefined);



// const v = [1,2,3,4,5].reduce(function(state, action) {
// 	console.log('state: ', state, ', action:', action);
// 	return state + action;
// }, 0);

// console.log(v);







