import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Range, getTrackBackground } from 'react-range';
import UiCard from '../../shared/components/ui-card/UiCard';
import UiTextField from '../../shared/components/ui-text-field/UiTextField';
import UiSelect from '../../shared/components/ui-select/UiSelect';
import UiPagination from '../../shared/components/ui-pagination/UiPagination';
import { ISelectItem } from 'src/models/ui';
import { IGoods } from 'src/models/goods';
import './MainPage.scss';
import api from '../../shared/api/api';

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
		const track = (min, max, values) => ({ props, children }) => (
			<div
				onMouseDown={props.onMouseDown}
				onTouchStart={props.onTouchStart}
				style={{
					...props.style,
					height: '36px',
					display: 'flex',
					width: '100%'
				}}
			>
				<div
					ref={props.ref}
					style={{
						height: '5px',
						width: '100%',
						borderRadius: '4px',
						background: getTrackBackground({
							values,
							colors: ['#ccc', '#548BF4', '#ccc'],
							min,
							max
						}),
						alignSelf: 'center'
					}}
				>
					{children}
				</div>
			</div>
		);
		const thumb = (values) => ({ index, props }) => (
			<div
				{...props}
				style={{
					...props.style,
					height: '15px',
					width: '15px',
					borderRadius: '50%',
					backgroundColor: '#FFF',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					boxShadow: '0px 2px 6px #AAA',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: '-28px',
						color: '#fff',
						fontWeight: 'bold',
						fontSize: '14px',
						fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
						padding: '4px',
						borderRadius: '4px',
						backgroundColor: '#548BF4'
					}}
				>
					{values[index].toFixed(0)}
				</div>
			</div>
		);
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
								values={this.state.price}
								min={0}
								max={55000}
								step={500}
								onChange={this.onPriceChange}
								renderTrack={track(0, 55000, this.state.price)}
								renderThumb={thumb(this.state.price)}
							/>
						</div>
						<div className="filters__rating">
							<label>Рейтинг</label>
							<Range
								values={this.state.rating}
								min={0}
								max={5}
								onChange={this.onRatingChange}
								renderTrack={track(0, 5, this.state.rating)}
								renderThumb={thumb(this.state.rating)}
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
