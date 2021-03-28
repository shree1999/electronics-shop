import React from 'react';

import { Jumbotron } from '../components/Cards/Jumbotron';
import { NewArrivals } from '../components/Home/NewArrivals';
import { BestSellers } from '../components/Home/BestSeller';
import { CategoryList } from '../components/navs/Category';

const Home = () => {
  return (
    <>
      <div className="jumbotron">
        <h1
          className="display-3 text-danger text-primary text-center"
          style={{ fontWeight: 'bold' }}
        >
          <Jumbotron text={['Best Products', 'New Arrivals', 'Welcome']} />
        </h1>
      </div>

      <h4 className="text-center display-4 p-3 my-5 jumbotron">New Arrivals</h4>

      <NewArrivals />
      <h4 className="text-center display-4 p-3 my-5 jumbotron">Best Sellers</h4>
      <BestSellers />

      <h4 className="text-center display-4 p-3 my-5 jumbotron">Categories</h4>
      <CategoryList />
    </>
  );
};

export default Home;
