import React, { Component } from 'react';
import UiCard from '../../shared/components/ui-card/UiCard';
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
			<div className="main-page">
				<h1>Список товаров</h1>
				<ul className="main-page__goods">
					{this.state.goods.map(item => (
						<li key={item.id}>
							<UiCard className="main-page__good" {...item} />
						</li>
					))}
				</ul>
			</div>
		);
	}

	componentDidMount() {
		this.setState({
			goods,
		});
	}
}

export default MainPage;
