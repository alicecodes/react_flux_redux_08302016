import 'bootstrap-loader';
import '../css/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

const ListItemComponent = (props) => {

	const deleteItem = () => {
		props.onDelete(props.item.id);
	};

	return <li>
		<span>{props.item.name}</span>
		<button type="button" onClick={deleteItem}>Delete</button>
	</li>;

};

ListItemComponent.propTypes = {
	item: React.PropTypes.object.isRequired,
	onDelete: React.PropTypes.function.isRequired
};

class ListComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			items: props.items.concat()
		};

	}

	deleteItem(itemId) {
		console.log(itemId);
	}

	render() {

		return <div><h1>{this.props.header}</h1><ul>
			{this.state.items.map(item =>
				<ListItemComponent key={item.id} item={item} onDelete={this.deleteItem} />)}
		</ul></div>;

	}

	static get propTypes() {

		return {
			header: React.PropTypes.string,
			items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
		};

	}

}

// ListComponent.propTypes = {
// 	header: React.PropTypes.string,
// 	items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
// };

ListComponent.defaultProps = {
	header: 'My List Component'
};



const items = [
	{ id: 1, name: 'first' },
	{ id: 2, name: 'second' },
	{ id: 3, name: 'third' }
];

ReactDOM.render(<ListComponent header="Intuit Rocks!" items={items} />, document.querySelector('main'));