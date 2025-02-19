import { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

import { handleAddToCart } from '../../actions/cart.action';

export const HomeProductCard = ({ product }) => {
  const [toolTip, setToolTip] = useState('Add to Cart');

  const { images, slug, title } = product;
  const dispatch = useDispatch();

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ''}
          style={{ height: '150px', objectFit: 'cover' }}
          className="p-1"
          alt={`${product.title}`}
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
        <Tooltip title={toolTip}>
          <a
            onClick={() => dispatch(handleAddToCart(product, setToolTip))}
            disabled={product.quantity < 1}
            href
          >
            <ShoppingCartOutlined className="text-danger" /> <br />{' '}
            {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
          </a>
        </Tooltip>,
      ]}
      style={{ width: '300px' }}
    >
      <Card.Meta title={title} />
    </Card>
  );
};
