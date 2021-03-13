import React from 'react';
import { Card } from 'antd';

export const ProductCard = ({ product }) => {
  return (
    <Card
      cover={
        <img
          src={product.images.length > 0 ? product.images[0].url : ''}
          style={{ height: '150px', objectFit: 'cover' }}
        />
      }
      className="m-3"
    >
      <Card.Meta title={product.title} description={product.description} />
    </Card>
  );
};
