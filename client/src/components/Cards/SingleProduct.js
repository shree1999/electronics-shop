import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import StarRating from 'react-star-ratings';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { toast } from 'react-toastify';

import Laptop from '../../images/laptop.png';
import { ProductListItems } from './ProductListItem';
import RatingModal from '../Modals/RatingModal';
import { showAverage } from '../AvgRating';
import { handleAddToCart } from '../../actions/cart.action';
import { addToWishlist } from '../../actions/userAction';

export const SingleProduct = ({ product, star, onReviewClick }) => {
  const [toolTip, setToolTip] = useState('Add To Cart');
  const auth = useSelector(state => state.auth);

  const { title, description, images, _id } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToWishlist = e => {
    e.preventDefault();
    addToWishlist(product._id, auth.token).then(res => {
      console.log('ADDED TO WISHLIST', res.data);
      toast.success('Added to wishlist');
      history.push('/user/wishlist');
    });
  };

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map(i => (
                <img src={i.url} key={i.public_image_id} alt="product" />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img src={Laptop} className="mb-3 card-image" alt="product" />
            }
          ></Card>
        )}
        <Tabs type="card">
          <Tabs.TabPane tab="Description" key="1">
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product.
          </Tabs.TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-1 text-danger">No rating yet</div>
        )}
        <Card
          actions={[
            <Tooltip title={toolTip}>
              <a
                onClick={() => dispatch(handleAddToCart(product, setToolTip))}
                disabled={product.quantity < 1}
                href
              >
                <ShoppingCartOutlined className="text-success" /> <br />
                {product.quantity < 1 ? 'Out of stock' : 'Add to Cart'}
              </a>
            </Tooltip>,
            <a onClick={handleAddToWishlist} href>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                numberOfStars={5}
                starRatedColor="red"
                name={_id}
                rating={star}
                changeRating={onReviewClick}
                isSelectable={true}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};
