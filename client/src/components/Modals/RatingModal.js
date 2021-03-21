import React, { useState } from 'react';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { StarOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';

const RatingModal = ({ children }) => {
  const authUser = useSelector(state => state.auth);
  const [modalVisible, setModalVisible] = useState(false);

  const history = useHistory();
  const { slug } = useParams();

  const onClickHandler = () => {
    if (authUser && authUser.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: '/login',
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={onClickHandler}>
        <StarOutlined className="text-danger" /> <br />{' '}
        {authUser.token ? 'Leave rating' : 'Login to leave rating'}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success('Thanks for your review. It will apper soon');
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
