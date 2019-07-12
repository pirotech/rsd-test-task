import React from 'react';
import PropTypes from 'prop-types';
import './UiCard.scss';

const UiCard = ({ className, name, brand, price, rating }) => {
  const classNames = {
    card: (className ? className + ' ' : '') + ' ui-card',
    rating: `ui-card__rating ui-card__rating_${rating}`,
  };

  return (
    <div className={classNames.card}>
      <div className="ui-card-left">
        <h3 className="ui-card__name">{ name }</h3>
        <p className="ui-card__brand">{ brand }</p>
      </div>
      <div className="ui-card-right">
        <p className="ui-card__price">{ price }р.</p>
        <p className={classNames.rating}>{ rating } / 5</p>
      </div>
    </div>
  );
};

UiCard.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
};

export default UiCard;
