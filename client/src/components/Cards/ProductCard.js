import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export const HomeProductCard = ({ product }) => {
  const { images, slug, title, description } = product;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ''}
          style={{ height: '150px', objectFit: 'cover' }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" /> <br /> View Product
        </Link>,
        <>
          <ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
        </>,
      ]}
      style={{ width: '300px' }}
    >
      <Card.Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};
