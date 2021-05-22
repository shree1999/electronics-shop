import React from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { deleteProduct } from '../../actions/product.action';

export const ProductCard = ({ product }) => {
  const history = useHistory();

  const authUser = useSelector(state => state.auth);

  const onClickHandler = async slug => {
    try {
      const ans = window.confirm('Are You sure?');
      if (ans) {
        const data = await deleteProduct(slug, authUser.token);
        toast.success(`${data.title} successfully deleted`);
        history.push('/admin/product');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Card
      cover={
        <img
          src={product.images.length > 0 ? product.images[0].url : ''}
          style={{ height: '150px', objectFit: 'cover' }}
          alt={`${product.title} product image`}
        />
      }
      actions={[
        <Link to={`/admin/product/edit/${product.slug}`}>
          <EditOutlined className="text-warning" />
        </Link>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => onClickHandler(product.slug)}
        />,
      ]}
      className="m-3"
    >
      <Card.Meta
        title={product.title}
        description={`${product.description.substring(0, 30)}...`}
      />
    </Card>
  );
};
