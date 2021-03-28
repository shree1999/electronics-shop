import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { HomeProductCard } from '../components/Cards/ProductCard';
import {
  filterProducts,
  fetchProductsByNumber,
} from '../actions/product.action';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  let search = useSelector(state => state.search);
  const { text } = search;
  console.log(text);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { data } = await fetchProductsByNumber(10);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err.message);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSearchProducts({ query: text });
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  const fetchSearchProducts = async args => {
    try {
      const data = await filterProducts(args);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <h3>search/filter menu</h3>
        </div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row pb-5">
            {products.map(p => (
              <div key={p._id} className="col-md-4 mt-3">
                <HomeProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
