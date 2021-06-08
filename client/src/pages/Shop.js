import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Slider, Checkbox, Radio } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';

import { HomeProductCard } from '../components/Cards/ProductCard';
import { Star } from '../components/Forms/Star';
import {
  filterProducts,
  fetchProductsByNumber,
} from '../actions/product.action';
import { getCategories } from '../actions/category.action';
import { getAllSubCategories } from '../actions/sub.action';
import { SEARCH_QUERY } from '../constants';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [cats, setCats] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState('');
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const brands = ['Apple', 'Lenovo', 'Sony', 'Samsung', 'Hp'];
  const [brand, setBrand] = useState('');
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const [color, setColor] = useState('');

  let search = useSelector(state => state.search);
  const { text } = search;

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { data } = await fetchProductsByNumber(10);
        const res = await getCategories();
        const res2 = await getAllSubCategories();
        setProducts(data);
        setCats(res.data);
        setSubs(res2.data);
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
    }, 500);

    return () => clearTimeout(delay);
  }, [text]);

  // 2. using price range
  useEffect(() => {
    fetchSearchProducts({ price });
  }, [ok]);

  const setPriceRangeHandler = value => {
    dispatch({ type: SEARCH_QUERY, payload: { text: '' } });
    setCategoryIds([]);
    setPrice(value);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // 3. Using Categories
  const showCategories = () =>
    cats.map(c => (
      <div key={c._id}>
        <Checkbox
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          value={c._id}
          checked={categoryIds.includes(c._id)}
          onChange={onCheckFilterHandler}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  const onCheckFilterHandler = e => {
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setStar('');
    setSub('');
    setBrand('');
    setColor('');
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchSearchProducts({ category: inTheState });
  };

  // 4. Handle Star rating filter
  const showStars = () =>
    [5, 4, 3, 2, 1].map(ele => (
      <Star
        numberOfStars={ele}
        key={ele.toString()}
        handleSearch={handleStarClick}
      />
    ));

  const handleStarClick = num => {
    // console.log(num);
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub('');
    setStar(num);
    setBrand('');
    setColor('');
    fetchSearchProducts({ stars: num });
  };

  // 4. Filter by sub categories
  const showAllSubCategories = () =>
    subs.map(s => (
      <div
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: 'pointer' }}
        key={s._id}
        onClick={() => fetchUsingSub(s)}
      >
        {s.name}
      </div>
    ));
  const fetchUsingSub = sub => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setColor('');
    fetchSearchProducts({ subs: sub });
  };

  // 5. Brand Filter
  const showBrands = () =>
    brands.map(b => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-4"
        key={b}
      >
        {b}
      </Radio>
    ));

  const handleBrand = e => {
    setSub('');
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand(e.target.value);
    fetchSearchProducts({ brand: e.target.value });
  };

  // 6. Color Filter
  const showColors = () =>
    colors.map(c => (
      <Radio
        value={c}
        name={c}
        checked={c === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-4"
        key={c}
      >
        {c}
      </Radio>
    ));

  const handleColor = e => {
    setSub('');
    dispatch({
      type: SEARCH_QUERY,
      payload: { text: '' },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar('');
    setBrand('');
    setColor(e.target.value);
    fetchSearchProducts({ color: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>search/filter menu</h4>
          <hr />
          <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6']} mode="inline">
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
                  max="1000000"
                  onChange={setPriceRangeHandler}
                />
              </div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="2"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }}>{showCategories()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="3"
              title={
                <span className="h6">
                  <StarOutlined /> Ratings
                </span>
              }
            >
              <div style={{ maringTop: '-10px', marginLeft: '25px' }}>
                {showStars()}
              </div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub-Categories
                </span>
              }
            >
              <div style={{ maringTop: '-10px', marginLeft: '25px' }}>
                {showAllSubCategories()}
              </div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }}>{showBrands()}</div>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: '-10px' }}>{showColors()}</div>
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
