import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

import { getCategories } from '../../actions/category.action';

export const CategoryList = () => {
  const [cat, setCat] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoad(prevState => true);
      const { data } = await getCategories();

      setLoad(prevState => false);
      setCat(prevState => data);
    } catch (err) {
      setLoad(prevState => false);
      console.error(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {load ? (
          <Spin size="large" />
        ) : (
          cat.map(c => (
            <div
              className="col btn btn-outline-primary btn-block btn-raised m-1"
              key={c._id}
            >
              <Link to={`/category/${c.slug}`}>{c.name}</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
