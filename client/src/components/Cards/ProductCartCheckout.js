import React from 'react';
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteTwoTone,
} from '@ant-design/icons';
import ModalImage from 'react-modal-image';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import {
  ModifyCountOfProduct,
  removeCartItem,
} from '../../actions/cart.action';
import laptop from '../../images/laptop.png';

export const ProductCardInCheckout = ({ p }) => {
  const dispatch = useDispatch();

  const onQuantityChangeHandler = e => {
    let count = e.target.value < 1 ? 1 : Number(e.target.value);

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    dispatch(ModifyCountOfProduct(p, count));
  };

  const onClickDeleteCartItem = () => {
    const ans = window.confirm(`Are you sure? you want to remove ${p.title}`);
    if (ans) {
      dispatch(removeCartItem(p));
    }
  };

  return (
    <tr>
      <td>
        <div style={{ width: '100px', height: 'auto' }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </div>
      </td>
      <td>{p.title}</td>
      <td>${p.price}</td>
      <td>{p.brand}</td>
      <td>{p.color}</td>
      <td>
        <input
          type="number"
          onChange={onQuantityChangeHandler}
          value={p.count}
          className="form-control"
        />
      </td>
      <td className="text-center">
        {p.shipping === 'Yes' ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#f32013" />
        )}
      </td>
      <td className="text-center">
        <DeleteTwoTone
          twoToneColor="#ff0000"
          style={{ cursor: 'pointer' }}
          onClick={onClickDeleteCartItem}
        />
      </td>
    </tr>
  );
};
