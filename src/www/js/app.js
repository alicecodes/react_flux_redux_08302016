import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const widgets = [
	{
		"_id": "1",
		"name": "Small Red Widget",
		"color": "red",
		"size": "small",
		"quantity": 2,
	}
];

let lastWidgetId = 1;

const actionTypes = keyMirror({
	REFRESH_WIDGETS: null,
	APPEND_WIDGET: null,
	DELETE_WIDGET: null
});

const deleteItems = (items, index, numOfItems) => {  
	return items.slice(0, index).concat(items.slice(index + numOfItems));
};

const reducer = (state = [], action) => {

	switch (action.type) {
		case actionTypes.REFRESH_WIDGETS:
			return state;
		case actionTypes.APPEND_WIDGET:
			return state.concat(action.widget);
		case actionTypes.DELETE_WIDGET:
			return deleteItems(state, state.indexOf(state.find(widget => widget.id === action.widgetId)), 1);
	}	

	return state;

};

const refreshWidgetsAction = () => ({ type: actionTypes.REFRESH_WIDGETS });
const appendWidgetAction = widget => ({ type: actionTypes.APPEND_WIDGET, widget });
const deleteWidgetAction = widgetId => ({ type: actionTypes.DELETE_WIDGET, widgetId });

class WidgetTable extends React.Component {

	render() {
		return <table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Color</th>
					<th>Size</th>
					<th>Quantity</th>
				</tr>
			</thead>
			<tbody>
				{this.props.widgets.map(widget =>
					<tr key={widget._id}>
						<td>{widget.name}</td>
						<td>{widget.color}</td>
						<td>{widget.size}</td>
						<td>{widget.quantity}</td>
					</tr>
				)}
			</tbody>
		</table>;	
	}

}

WidgetTable.propTypes = {
	widgets: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

class WidgetForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			widgetName: '',
			widgetColor: '',
			widgetSize: '',
			widgetQuantity: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onClick() {
		this.props.addNewWidget({
			name: this.state.widgetName,
			color: this.state.widgetColor,
			size: this.state.widgetSize,
			quantity: this.state.widgetQuantity,
		});

		this.setState({
			widgetName: '',
			widgetColor: '',
			widgetSize: '',
			widgetQuantity: ''
		});
	}

	render() {
		return <form>
			<div>
				<label>Widget Name:</label>
				<input type="text" name="widgetName" id='widget-name'
					value={this.state.widgetName} onChange={this.onChange} />
			</div>
			<div>
				<label>Widget Color:</label>
				<input type="text" name="widgetColor" id='widget-color'
					value={this.state.widgetColor} onChange={this.onChange} />
			</div>
			<div>
				<label>Widget Size:</label>
				<input type="text" name="widgetSize" id='widget-size'
					value={this.state.widgetSize} onChange={this.onChange} />
			</div>
			<div>
				<label>Widget Quantity:</label>
				<input type="text" name="widgetQuantity" id='widget-quantity'
					value={this.state.widgetQuantity} onChange={this.onChange} />
			</div>
			<button type="button" onClick={this.onClick}>Add New Widget</button>
		</form>;
	}

}

WidgetForm.propTypes = {
	addNewWidget: React.PropTypes.func.isRequired
};



class WidgetsApp extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			widgets: []
		};

		this.addNewWidget = this.addNewWidget.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = this.props.store.subscribe(() => {
			this.setState({ widgets: this.props.store.getState() });
		});

		this.setState({ widgets: this.props.store.getState() });
	}

	componentWillUnmount() {
		this.unsubscribe();
	}


	addNewWidget(newWidget) {
		newWidget._id = ++lastWidgetId; 
		console.log(newWidget);
		this.props.store.dispatch(appendWidgetAction(newWidget));
	}

	render() {

		return <div>
			<WidgetTable widgets={this.state.widgets} />
			<WidgetForm addNewWidget={this.addNewWidget} />
		</div>;

	}

}

WidgetsApp.propTypes = {
	store: React.PropTypes.object.isRequired
};

ReactDOM.render(<WidgetsApp store={createStore(reducer, widgets)} />, document.querySelector('main'));







