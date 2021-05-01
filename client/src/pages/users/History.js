import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../../actions/userAction';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  PDFViewer,
} from '@react-pdf/renderer';

import UserNav from '../../components/navs/UserNav';
import { ShowPaymentInfo } from '../../components/Cards/ShowPaymentInfo';

const History = () => {
  const [products, setProducts] = useState([]);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getUserOrders(auth.token);
      console.log(res.data);

      setProducts(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const showOrderInTable = order => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === 'Yes' ? (
                <CheckCircleOutlined style={{ color: 'green' }} />
              ) : (
                <CloseCircleOutlined style={{ color: 'red' }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = order => (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4">
            <View>
              <Text>Section #1</Text>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      }
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () => (
    <Fragment>
      {products.map((order, i) => (
        <div key={i} className="m-5 p-3 card">
          <ShowPaymentInfo order={order} />
          {showOrderInTable(order)}
          <div className="row">
            <div className="col">
            {showDownloadLink(order)}
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div col-md-10>
          <h3 className="display-4">
            {products.length > 0
              ? 'User purchase orders'
              : 'No purchase orders'}
          </h3>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
