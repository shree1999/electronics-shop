import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

import { HomeProductCard } from '../components/Cards/ProductCard';
import {
  filterProducts,
  fetchProductsByNumber,
} from '../actions/product.action';
import { SEARCH_QUERY } from '../constants';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  let search = useSelector(state => state.search);
  const { text } = search;

  const dispatch = useDispatch();

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

  const fetchSearchProducts = async args => {
    try {
      const data = await filterProducts(args);
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  // 1. Using search bar
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSearchProducts({ query: text });
    }, 300);

    return () => clearTimeout(delay);
  }, [text]);

  // 2. using price range
  useEffect(() => {
    fetchSearchProducts({ price });
  }, [ok]);

  const setPriceRangeHandler = value => {
    dispatch({ type: SEARCH_QUERY, payload: { text: '' } });
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>search/filter menu</h4>
          <hr />
          <Menu defaultOpenKeys={['1', '2']} mode="inline">
            <Menu.SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={v => `$${v}`}
                  range
                  value={price}
                  max="4999"
                  onChange={setPriceRangeHandler}
                />
              </div>
            </Menu.SubMenu>
          </Menu>
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
