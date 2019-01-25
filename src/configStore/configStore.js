import { createBrowserHistory } from 'history';
import {connectRouter, routerMiddleware} from "connected-react-router";

import {composeWithDevTools} from "redux-devtools-extension";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";


export const history = createBrowserHistory();

const initialState = {};

export const store = createStore(
	connectRouter(history)(() => {}),
	initialState,
	composeWithDevTools(applyMiddleware(
		thunk,
		routerMiddleware(history)
	))
);
