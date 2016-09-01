import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';

const actionTypes = keyMirror({
	APPEND_ITEM: null
});

const reducer = (state = { items: [] }, action) => {

	let newState = state;

	switch (action.type) {
		case actionTypes.APPEND_ITEM:
			newState = Object.assign({}, state, { items: state.items.concat(action.item) });
	}

	console.log('New State -----');
	console.log(JSON.stringify(newState));

	return newState;
};

[
	{ type: actionTypes.APPEND_ITEM, item: { id: 1, name: 'Item 1'}}, // action
	{ type: actionTypes.APPEND_ITEM, item: { id: 2, name: 'Item 2'}}, // action
	{ type: actionTypes.DELETE_ITEM, itemId: 1 }, // implement this action in the system
	{ type: actionTypes.APPEND_ITEM, item: { id: 3, name: 'Item 3'}}, // action
].reduce(reducer, undefined);



// const v = [1,2,3,4,5].reduce(function(state, action) {
// 	console.log('state: ', state, ', action:', action);
// 	return state + action;
// }, 0);

// console.log(v);







