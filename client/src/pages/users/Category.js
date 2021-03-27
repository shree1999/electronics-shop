import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { HomeProductCard } from '../../components/Cards/ProductCard';
import { getCategory } from '../../actions/category.action';

export const CategoryPage = ({ match }) => {
  const [cat, setCat] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategory();
  }, []);

  const { slug } = match.params;

  const loadCategory = async () => {
    try {
      setLoading(true);
      const { data } = await getCategory(slug);
      setLoading(false);
      setProducts(data.products);
      setCat(data.category);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{cat.name}" category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.map(p => (
          <div className="col" key={p._id}>
            <HomeProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};
