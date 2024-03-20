import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const PlaceCard = ({ PlaceCardName, src, onClick }) => (
  <Card
    hoverable
    cover={<img alt="example" src={src} />}
    onClick={onClick}
  >
    <p>{PlaceCardName}</p>
  </Card>
);

export default PlaceCard;
