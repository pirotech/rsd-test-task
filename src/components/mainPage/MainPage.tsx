import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import UiCard from '../../shared/components/ui-card/UiCard';
import UiTextField from '../../shared/components/ui-text-field/UiTextField';
import UiSelect from '../../shared/components/ui-select/UiSelect';
import UiPagination from '../../shared/components/ui-pagination/UiPagination';
import { ISelectItem } from 'src/models/ui';
import { IGoods } from 'src/models/goods';
import api from '../../shared/api/api';
import {Range, Handle, Marks} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import './MainPage.scss';

interface IProps extends RouteComponentProps {
}
interface IState {
	goods: IGoods[];
	filteredGoods: IGoods[];

	searchString: string;
	brand: ISelectItem;
	brands: ISelectItem[];
	price: number[];
	rating: number[];
	pageCount: number;
	page: number;
}

class MainPage extends React.Component<IProps, IState> {
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
			price: [0, 55000],
			rating: [0, 5],
      pageCount: 1,
			page: 0,
		};
	}

	onSearchStringChange = (event) => {
		const { value } = event.target;

		localStorage.setItem('searchString', value);
		localStorage.setItem('page', 0 + '');

		this.setState({
			searchString: value,
			page: 0,
		}, this.filterGoods);
	};
	onBrandChange = (value) => {
		localStorage.setItem('brand', JSON.stringify(value));
		localStorage.setItem('page', '0');

		this.setState({
			brand: value,
			page: 0,
		}, this.filterGoods);
	};
	onPriceChange = (value) => {
		localStorage.setItem('price', JSON.stringify(value));
		localStorage.setItem('page', '0');

		this.setState({
			price: value,
			page: 0,
		}, this.filterGoods);
	};
	onRatingChange = (value) => {
		localStorage.setItem('rating', JSON.stringify(value));
		localStorage.setItem('page', '0');

		this.setState({
			rating: value,
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
      const [ min, max ] = this.state.price;
      return item.price >= min && item.price <= max;
    }).filter((item => {
      const [ min, max ] = this.state.rating;
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

		localStorage.setItem('page', page + '');
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
		const handle = (props) => {
			const { value, dragging, index, ...restProps } = props;
			return (
				<Tooltip
					prefixCls="rc-slider-tooltip"
					overlay={value}
					visible={dragging}
					placement="top"
					key={index}
				>
					<Handle value={value} {...restProps} />
				</Tooltip>
			);
		};
		const marksPrice: Marks = {};
		marksPrice[0] = '0';
		marksPrice[55000] = '55000';
		const marksRating: Marks = {};
		marksRating[0] = '0';
		marksRating[5] = '5';
		const handleStyle = [
			{
				borderColor: '#2684FF',
				backgroundColor: 'white'
			},
			{
				borderColor: '#2684FF',
				backgroundColor: 'white'
			}
		];
		const dotStyle = {
			backgroundColor: '',
			borderColor: 'hsl(0, 0%, 80%)',
		};
		const railStyle = {
			backgroundColor: 'hsl(0, 0%, 80%)',
			height: '4px',
		};
		const trackStyle = [{
			backgroundColor: '#2684FF',
		}];

		return (
			<div className="main-page">
				<h1>Список товаров</h1>
        <div className="filters">
					<div className="filters__search-line">
						<UiTextField
							value={this.state.searchString}
							placeholder="Поиск"
              onChange={this.onSearchStringChange}
						/>
					</div>
					<div className="filters-line">
						<div className="filters__brand">
							<label>Бренд</label>
							<UiSelect
								value={this.state.brand}
								options={this.state.brands}
								onChange={this.onBrandChange}
							/>
						</div>
						<div className="filters__price">
							<label>Цена</label>
              <Range
								count={1}
                min={0}
                max={55000}
                defaultValue={this.state.price}
                step={500}
                marks={marksPrice}
								allowCross={false}
								onAfterChange={this.onPriceChange}
								handle={handle}
								handleStyle={handleStyle}
								dotStyle={dotStyle}
								railStyle={railStyle}
								trackStyle={trackStyle}
              />
						</div>
						<div className="filters__rating">
							<label>Рейтинг</label>
							<Range
								count={1}
								min={0}
								max={5}
								defaultValue={this.state.rating}
								step={1}
								marks={marksRating}
								allowCross={false}
								onAfterChange={this.onRatingChange}
								handle={handle}
								handleStyle={handleStyle}
								dotStyle={dotStyle}
								railStyle={railStyle}
								trackStyle={trackStyle}
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
		api.goods.all().then((response) => {
			const goods: IGoods[] = response.data;
			let value: string;

			const searchString: string = localStorage.getItem('searchString');
			value = localStorage.getItem('brand');
			const brand: ISelectItem = value ? JSON.parse(value) : null;
			value = localStorage.getItem('price');
			const price = value ? JSON.parse(value) : [0, 55000];
			value = localStorage.getItem('rating');
			const rating = value ? JSON.parse(value) : [0, 5];
			value = localStorage.getItem('page');
			const page = value ? parseInt(value) : null;

			this.setState({
				goods,
				searchString: searchString || '',
				brand: brand || { value: 'Все', label: 'Все' },
				price: price || [0, 55000],
				rating: rating || [0, 5],
				page: page || 0,
			}, this.filterGoods);
		});
	}
}

export default MainPage;
