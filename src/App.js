import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
// components
import TestPage from './components/testPage/TestPage';

// shared styles
import './shared/css/app.scss';


class App extends Component {

	render() {
		return (
			<ConnectedRouter history={ this.props.history }>
				<div className="app">
					<Switch>
						<Route path="/test" component={ TestPage } />
						<Redirect to="/test" />
					</Switch>
				</div>
			</ConnectedRouter>
		);
	}

}

App.propTypes = {
	history: PropTypes.object.isRequired
};

export default connect(
	state => ({
		sidebar: state.sidebar
	}),
	//dispatch => ({
	// onAddTrack: (name) => {
	//   const payload = {
	//     id: Date.now().toString(),
	//     name
	//   }
	//   dispatch({type: "ADD_TRACK", payload})
	// },
	// onFindTrack: (name) => {
	//   dispatch({type: "FIND_TRACK", payload: name})
	// },
	// onGetTracks: () => {
	//   dispatch(getTracks())
	// }
	//})
)(App);
