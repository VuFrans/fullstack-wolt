import React from 'react';
import '../styles/Card.css';

export default function Card({ restaurant }) {
  const { name, image, description, delivery_price, tags } = restaurant;

  return (
    <div className="grid-item">
      <div className="image-container">
        <img alt={name} src={image} />
      </div>
      <div className="text-container">
        <div className="title-card">
          <div className="title">{name}</div>
          <div className="description">{description}</div>
        </div>
        <div className="bottom-card">
          {'Kuljetus ' + delivery_price / 100 + '€ '}
          <br />
          {tags.join(', ')}
        </div>
      </div>
    </div>
  );
}
