import React, { Component } from 'react';
import UiCard from '../../shared/components/ui-card/UiCard';
import UiTextField from '../../shared/components/ui-text-field/UiTextField';
import UiSelect from '../../shared/components/ui-select/UiSelect';
import UiRange from '../../shared/components/ui-range/UiRange';
import goods from './goods.json';
import './MainPage.scss';


class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			goods: [],
      filteredGoods: [],

			searchString: '',
			brand: { value: 'Все', label: 'Все' },
			brands: [
				{ value: 'Все', label: 'Все' },
				{ value: 'Merida', label: 'Merida' },
				{ value: 'Валдай', label: 'Валдай' },
				{ value: 'Баск', label: 'Баск' },
				{ value: 'Noname', label: 'Noname' },
				{ value: 'Fisher', label: 'Fisher' },
				{ value: 'Climb-x', label: 'Climb-x' },
				{ value: 'Mammut', label: 'Mammut' },
			],
			price: {
				min: 0,
				max: 55000,
			},
			rating: {
				min: 0,
				max: 5,
			},
		};
	}

	onFieldChange = (name, value) => {
		this.setState({
			[name]: value,
		}, this.filterGoods);
  };

	filterGoods = () => {
    const filteredGoods = this.state.goods.filter((item) => {
      const name = item.name.toLowerCase();
      const searchString = this.state.searchString.toLowerCase();
      if (!searchString) {
        return true;
      }
      return name.includes(searchString);
    }).filter((item) => {
      const brand = item.brand.toLowerCase();
      const filterBrand = this.state.brand && this.state.brand.value.toLowerCase();
      return filterBrand === 'все' || brand === filterBrand;
    }).filter((item) => {
      const { min, max } = this.state.price;
      return item.price >= min && item.price <= max;
    }).filter((item => {
      const { min, max } = this.state.rating;
      return item.rating >= min && item.rating <= max;
    }));
    this.setState({
      filteredGoods,
    });
  };

	render() {
		return (
			<div className="main-page">
				<h1>Список товаров</h1>
        <div className="filters">
					<div className="filters__search-line">
						<UiTextField
							value={this.state.searchString}
							placeholder="Поиск"
              onChange={(event) => this.onFieldChange('searchString', event.target.value)}
						/>
					</div>
					<div className="filters-line">
						<div className="filters__brand">
							<label>Бренд</label>
							<UiSelect
								value={this.state.brand}
								options={this.state.brands}
								onChange={(value) => this.onFieldChange('brand', value)}
							/>
						</div>
						<div className="filters__price">
							<label>Цена</label>
							<UiRange
								value={this.state.price}
								draggableTrack
								minValue={0}
								maxValue={55000}
								step={500}
								onChange={value => this.onFieldChange('price', value)}
								OnChangeComplete={() => {}}
							/>
						</div>
						<div className="filters__rating">
							<label>Рейтинг</label>
							<UiRange
								value={this.state.rating}
								draggableTrack
								minValue={0}
								maxValue={5}
								onChange={value => this.onFieldChange('rating', value)}
								OnChangeComplete={() => {}}
							/>
						</div>
					</div>
        </div>
				<ul className="goods">
					{this.state.filteredGoods.map(item => (
						<li key={item.id}>
							<UiCard className="item" {...item} />
						</li>
					))}
				</ul>
			</div>
		);
	}

	componentDidMount() {
		this.setState({
			goods,
      filteredGoods: goods,
		});
		// this.filterGoods();
	}
}

export default MainPage;
