import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../shared/components/ui-button/UiButton';
import goods from '../../goods.json';
import './DetailsPage.scss';


class DetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      brand: '',
      price: '',
      rating: '',
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
    let found = goods.filter(item => (
      item.id === parseInt(this.props.match.params.id)
    ));
    found = found.length > 0 ? found[0] : {};
    console.log(found);

    this.setState({
      id: this.props.match.params.id,
      ...found,
    });
  }
}

DetailsPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default DetailsPage;
