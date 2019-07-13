import React, { Component } from 'react';
import UiCard from '../../shared/components/ui-card/UiCard';
import UiTextField from '../../shared/components/ui-text-field/UiTextField';
import UiSelect from '../../shared/components/ui-select/UiSelect';
import UiRange from '../../shared/components/ui-range/UiRange';
import UiPagination from '../../shared/components/ui-pagination/UiPagination';
import goods from '../../goods.json';
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
      pageCount: 1,
			page: 0,
		};
	}

	onFieldChange = (name, value) => {
		localStorage.setItem(name, typeof value === 'object' ? JSON.stringify(value) : value);
		localStorage.setItem('page', 0 + '');
		this.setState({
			[name]: value,
			page: 0,
		}, this.filterGoods);
  };

	filterGoods = () => {
		// filter by top side filters
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
    // calc count of pages
    const PER_PAGE = 6;
    const pageCount = Math.ceil(filteredGoods.length / PER_PAGE);
    const { page } = this.state;
    // filter one page
		const pagedGoods = filteredGoods.filter((item, index) => {
			return index >= PER_PAGE * page && index < PER_PAGE * (page + 1);
		});

		localStorage.setItem('page', page);
		this.setState({
      filteredGoods: pagedGoods,
			pageCount,
			page,
    });
  };

	onPageChange = (value) => {
		const page = value.selected;
		localStorage.setItem('page', page + '');
		this.setState({
			page,
		}, this.filterGoods);
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
						<li
							key={item.id}
							onClick={() => this.props.history.push(`/details/${item.id}`)}
						>
							<UiCard	className="item" {...item} />
						</li>
					))}
				</ul>
        <div className="pagination">
					<UiPagination
						forcePage={this.state.page}
						pageCount={this.state.pageCount}
						onPageChange={this.onPageChange}
					/>
        </div>
			</div>
		);
	}

	componentDidMount() {
		const searchString = localStorage.getItem('searchString');
		let brand = localStorage.getItem('brand');
		brand = brand ? JSON.parse(brand) : null;
		let price = localStorage.getItem('price');
		price = price ? JSON.parse(price) : null;
		let rating = localStorage.getItem('rating');
		rating = rating ? JSON.parse(rating) : null;
		let page = localStorage.getItem('page');
		page = page ? parseInt(page) : null;
		this.setState({
			goods,
			searchString: searchString || '',
			brand: brand || { value: 'Все', label: 'Все' },
			price: price || { min: 0, max: 55000 },
			rating: rating || {	min: 0,	max: 5 },
			page: page || 0,
		}, this.filterGoods);
	}
}

export default MainPage;
