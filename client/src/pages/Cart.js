import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ProductCardInCheckout } from '../components/Cards/ProductCartCheckout';
import { userCart } from '../actions/userAction';

export const CartPage = ({ history }) => {
  const { auth, cart } = useSelector(state => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveCartToDB = async () => {
    try {
      const data = await userCart(cart, auth.token);
      if (data.ok) {
        history.push('/user/checkout');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const showCartItemsTable = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        {cart.map(p => (
          <ProductCardInCheckout p={p} key={p._id} />
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h1 className="display-3">Cart / {cart.length} products</h1>
          {!cart.length ? (
            <p className="lead">
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            showCartItemsTable()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p className="lead">Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          <strong className="lead">Total: ${getTotal()}</strong>
          <hr />
          {auth && auth.email ? (
            <button
              className="btn btn-sm btn-primary mt-2"
              onClick={saveCartToDB}
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: '/login',
                  state: { from: 'cart' },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
