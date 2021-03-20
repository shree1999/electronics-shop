import React from 'react';

import { Jumbotron } from '../components/Cards/Jumbotron';
import { NewArrivals } from '../components/Home/NewArrivals';
import { BestSellers } from '../components/Home/BestSeller';

const Home = () => {
  return (
    <>
      <div className="jumbotron">
        <h1 className="display-3 text-center text-primary">
          <Jumbotron text={['Latest Products', 'New Arrivals']} />
        </h1>
      </div>

      <h4 className="text-center display-4 p-3 my-5 jumbotron">New Arrivals</h4>

      <NewArrivals />
      <h4 className="text-center display-4 p-3 my-5 jumbotron">Best Sellers</h4>
      <BestSellers />
    </>
  );
};

export default Home;
