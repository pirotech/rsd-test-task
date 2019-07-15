import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Button from '../../shared/components/ui-button/UiButton';
import { IGoods } from '../../models/goods';
import api from '../../shared/api/api';
import './DetailsPage.scss';

interface Params {
  id: string;
}
interface IProps extends RouteComponentProps<Params> {
}
interface IState extends IGoods {
}

class DetailsPage extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: '',
      brand: '',
      price: null,
      rating: null,
    };
  }

  render() {
    return (
      <div className="details-page">
        {this.state.name === '' ? (
          <h1>Товар не найден</h1>
        ) : (
          <>
            <h1>{this.state.name} ({this.state.brand})</h1>
            <h3 className="price">Цена: {this.state.price}p.</h3>
            <h3 className="rating">Рейтинг: {this.state.rating} / 5</h3>
          </>
        )}
        <Button onClick={() => this.props.history.push('/')}>К списку</Button>
      </div>
    );
  }

  componentDidMount() {
    api.goods.all().then((response) => {
      const goods = response.data;
      const found: IGoods[] = goods.filter(item => (
        item.id === parseInt(this.props.match.params.id)
      ));
      const single: IGoods | {} = found.length > 0 ? found[0] : {};

      this.setState({
        id: parseInt(this.props.match.params.id),
        ...single,
      });
    }).catch((error) => {
      console.error(error);
    });
  }
}

export default DetailsPage;
