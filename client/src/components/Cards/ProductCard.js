import React from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
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
        history.push('/admin/products');
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
        />
      }
      actions={[
        <EditOutlined className="text-warning" />,
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
