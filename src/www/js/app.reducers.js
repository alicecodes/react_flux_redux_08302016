import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';

const actionTypes = keyMirror({
	INCREMENT:null, DECREMENT:null
});

const sum = [1,2,3,4,5].reduce((prev, next) => {
	return prev + next;
}, 0);

console.log(sum);

const reducer = (state = 0, action) => {
	switch(action.type) {
		case actionTypes.INCREMENT:
			return state + 1;
		case actionTypes.DECREMENT:
			return state - 1;
		default:
			return state;
	}
};

const state = [
	{ type: actionTypes.INCREMENT },
	{ type: actionTypes.INCREMENT },
	{ type: actionTypes.INCREMENT }
].reduce(reducer, 0);

console.log(state);







