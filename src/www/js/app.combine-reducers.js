import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';

const actionTypes = keyMirror({
	INSERT_ITEM: null,
	DELETE_ITEM: null,
	FILTER_ITEMS: null
});


export const deleteItems = (items, index, numOfItems) => {
	return items.slice(0, index).concat(items.slice(index + numOfItems));
};

const itemsReducer = (state = [], action) => {
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

const itemFilterReducer = (state = '', action) => {
	switch(action.type) {
		case actionTypes.FILTER_ITEMS:
			state = action.filterValue;
			break;
	}
	return state;
};

const combine = (reducers) => {
	return (state = {}, action) => {
		const nextState = Object.keys(reducers).reduce((nextState, key) => {
			nextState[key] = reducers[key](state[key], action);
			return nextState;
		}, state);

		console.log('New State ---------------');
		console.log(JSON.stringify(nextState));

		return nextState;
	};
};

// const reducer = (state = {}, action) => {
// 	const nextState = {};
// 	nextState['items'] = itemsReducer(state['items'], action);
// 	nextState['itemFilter'] = itemFilterReducer(state['itemFilter'], action);

// 	console.log('New State ---------------');
// 	console.log(JSON.stringify(nextState));

// 	return nextState;
// };

const reducer = combine({ items: itemsReducer, itemFilter: itemFilterReducer });

[
	{ type: actionTypes.INSERT_ITEM, item: { id: 1, name: 'Item 1' } },
	{ type: actionTypes.INSERT_ITEM, item: { id: 2, name: 'Item 2' } },
	{ type: actionTypes.FILTER_ITEMS, filterValue: 'Item 1'},
	{ type: actionTypes.INSERT_ITEM, item: { id: 3, name: 'Item 3' } },
].reduce(reducer, { items: [], itemFilter: '' });







