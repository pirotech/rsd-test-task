import * as React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
// components
import TestPage from './components/testPage/TestPage';
import MainPage from './components/mainPage/MainPage';
import DetailsPage from './components/detailsPage/DetailsPage';
// shared styles
import './shared/css/app.scss';

interface IProps extends RouteComponentProps {
}

class App extends React.Component<IProps> {

	render() {
		return (
			<ConnectedRouter history={ this.props.history }>
				<div className="app">
					<Switch>
						<Route path="/" exact component={ MainPage } />
						<Route path="/details/:id" exact component={ DetailsPage } />
						<Route path="/test" component={ TestPage } />
						<Redirect to="/test" />
					</Switch>
				</div>
			</ConnectedRouter>
		);
	}

}

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
