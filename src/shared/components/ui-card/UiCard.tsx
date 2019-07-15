import * as React from 'react';
import './UiCard.scss';

interface IProps {
  className?: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
}

const UiCard: React.FC<IProps> = ({ className, name, brand, price, rating }: IProps) => {
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

export default UiCard;
