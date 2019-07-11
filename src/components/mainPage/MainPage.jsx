import React, { Component } from 'react';
import goods from './goods.json';
import './MainPage.scss';


class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			goods: [],
		};
	}

	render() {
		return (
			<ul>
				{this.state.goods.map(item => (
					<li key={item.id}>{item.name}</li>
				))}
			</ul>
		);
	}

	componentDidMount() {
		this.setState({
			goods,
		});
	}
}

export default MainPage;
