import React, { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import StarRating from 'react-star-ratings';
import { useDispatch } from 'react-redux';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Laptop from '../../images/laptop.png';
import { ProductListItems } from './ProductListItem';
import RatingModal from '../Modals/RatingModal';
import { showAverage } from '../AvgRating';
import { handleAddToCart } from '../../actions/cart.action';

export const SingleProduct = ({ product, star, onReviewClick }) => {
  const [toolTip, setToolTip] = useState('Add To Cart');

  const { title, description, images, _id } = product;

  const dispatch = useDispatch();

  return (
    <>
      <div className="col-md-7">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map(i => <img src={i.url} key={i.public_image_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}
        <Tabs type="card">
          <Tabs.TabPane tab="Description" key="1">
            {description && description}
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
              <a onClick={() => dispatch(handleAddToCart(product, setToolTip))}>
                <ShoppingCartOutlined className="text-success" /> <br />
                Add to Cart
              </a>
            </Tooltip>,
            <Link to="/">
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </Link>,
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
