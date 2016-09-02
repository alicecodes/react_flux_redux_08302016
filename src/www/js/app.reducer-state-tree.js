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

const reducer = (state = { items: [], itemFilter: '' }, action) => {
	switch(action.type) {
		case actionTypes.INSERT_ITEM:
			state.items = state.items.concat(action.item);
			break;
		case actionTypes.DELETE_ITEM:
			state.items = deleteItems(state.items, state.items.indexOf(state.items.find(item => item.id === action.item.id)));
			break;
		case actionTypes.FILTER_ITEMS:
			state.itemFilter = action.filterValue;
			break;
	}

	console.log('New State ---------------');
	console.log(JSON.stringify(state));

	return state;
};

[
	{ type: actionTypes.INSERT_ITEM, item: { id: 1, name: 'Item 1' } },
	{ type: actionTypes.INSERT_ITEM, item: { id: 2, name: 'Item 2' } },
	{ type: actionTypes.FILTER_ITEMS, filterValue: 'Item 1'},
	{ type: actionTypes.INSERT_ITEM, item: { id: 3, name: 'Item 3' } },
].reduce(reducer, { items: [], itemFilter: '' });







