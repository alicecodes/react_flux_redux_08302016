import 'bootstrap-loader';
import '../css/styles.scss';

import keyMirror from 'key-mirror';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const actionTypes = keyMirror({
	REFRESH_WIDGETS: null,
	REFRESH_WIDGETS_DONE: null,
	APPEND_WIDGET: null,
	DELETE_WIDGET: null,
});

const reducer = (state = [], action) => {

	switch (action.type) {
		case actionTypes.REFRESH_WIDGETS_DONE:
			return action.widgets;
	}	

	return state;

};

const store = createStore(reducer);

const refreshWidgetsAction = () => {

	fetch('/api/widgets').then(res => res.json()).then(results => {
		store.dispatch({ type: actionTypes.REFRESH_WIDGETS_DONE, widgets: results });
	});

	return { type: actionTypes.REFRESH_WIDGETS };
};

const appendWidgetAction = widget => {

	fetch('/api/widgets', {
		headers: new Headers({ 'Content-Type': 'application/json' }),
		method: 'POST',
		body: JSON.stringify(widget)
	}).then(res => res.json()).then(results => {
		store.dispatch(refreshWidgetsAction());
	});

	return { type: actionTypes.APPEND_WIDGET };

};

const deleteWidgetAction = widgetId => {

	fetch('/api/widgets/' + encodeURIComponent(widgetId), {
		method: 'DELETE',
	}).then(res => res.json()).then(() => {
		store.dispatch(refreshWidgetsAction());
	});

	return { type: actionTypes.DELETE_WIDGET };

};

class WidgetRow extends React.Component {

	constructor(props) {
		super(props);
	
		this.deleteWidget = this.deleteWidget.bind(this);
	}

	deleteWidget() {
		this.props.deleteWidget(this.props.widget._id);
	}

	render() {
		return <tr>
			<td>{this.props.widget.name}</td>
			<td>{this.props.widget.color}</td>
			<td>{this.props.widget.size}</td>
			<td>{this.props.widget.quantity}</td>
			<td><button type="button" onClick={this.deleteWidget}>Delete</button></td>
		</tr>;
	}
}

WidgetRow.propTypes = {
	widget: React.PropTypes.object.isRequired,
	deleteWidget: React.PropTypes.func.isRequired
};

class WidgetTable extends React.Component {

	render() {
		return <table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Color</th>
					<th>Size</th>
					<th>Quantity</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{this.props.widgets.map(widget =>
					<WidgetRow key={widget._id} widget={widget} deleteWidget={this.props.deleteWidget} />
				)}
			</tbody>
		</table>;	
	}

}

WidgetTable.propTypes = {
	widgets: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	deleteWidget: React.PropTypes.func.isRequired
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
		this.deleteWidget = this.deleteWidget.bind(this);
		this.refreshWidgets = this.refreshWidgets.bind(this);
	}

	componentDidMount() {
		this.unsubscribe = this.props.store.subscribe(() => {
			this.setState({ widgets: this.props.store.getState() });
		});

		this.props.store.dispatch(refreshWidgetsAction());
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	addNewWidget(newWidget) {
		this.props.store.dispatch(appendWidgetAction(newWidget));
	}

	deleteWidget(widgetId) {
		this.props.store.dispatch(deleteWidgetAction(widgetId));
	}

	refreshWidgets() {
		this.props.store.dispatch(refreshWidgetsAction());
	}

	render() {

		return <div>
			<button type="button" onClick={this.refreshWidgets}>Refresh</button>
			<WidgetTable widgets={this.state.widgets} deleteWidget={this.deleteWidget} />
			<WidgetForm addNewWidget={this.addNewWidget} />
		</div>;

	}

}

WidgetsApp.propTypes = {
	store: React.PropTypes.object.isRequired
};

ReactDOM.render(<WidgetsApp store={store} />, document.querySelector('main'));







