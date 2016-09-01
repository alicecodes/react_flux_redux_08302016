import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';

const actionTypes = keyMirror({
	REFRESH_WIDGETS: null,
	APPEND_WIDGET: null,
	DELETE_WIDGET: null
});

const deleteItems = (items, index, numOfItems) => {  
	return items.slice(0, index).concat(items.slice(index + numOfItems));
};

const reducer = (state = [], action) => {

	let newState;

	switch (action.type) {
		case actionTypes.REFRESH_WIDGETS:
			newState = state;
			break;
		case actionTypes.APPEND_WIDGET:
			newState = state.concat(action.widget);
			break;
		case actionTypes.DELETE_WIDGET:
			newState = deleteItems(state, state.indexOf(state.find(widget => widget.id === action.widgetId)), 1);
			break;
	}	

	console.log('new state...');
	console.log(JSON.stringify(newState));

	return newState;
};

const refreshWidgetsAction = () => ({ type: actionTypes.REFRESH_WIDGETS });
const appendWidgetAction = widget => ({ type: actionTypes.APPEND_WIDGET, widget });
const deleteWidgetAction = widgetId => ({ type: actionTypes.DELETE_WIDGET, widgetId });

[
	appendWidgetAction({ id: 1, name: 'Widget 1', color:'red', size:'large', quantity:2 }),
	appendWidgetAction({ id: 2, name: 'Widget 2', color:'blue', size:'small', quantity:4 }),
	deleteWidgetAction(1),
	appendWidgetAction({ id: 3, name: 'Widget 3', color:'yellow', size:'medium', quantity:5 }),
	refreshWidgetsAction()
].reduce(reducer, undefined);







