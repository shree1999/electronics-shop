import React from 'react';

export const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p className="lead small">
      <strong>Order Id:</strong> {order.paymentIntent.id}
    </p>

    <p className="lead small">
      <strong>Amount:</strong>
      {(order.paymentIntent.amount / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'INR',
      })}
    </p>

    <p className="lead small">
      <strong>Currency:</strong>
      {order.paymentIntent.currency.toUpperCase()}
    </p>

    <p className="lead small">
      <strong>Method:</strong>
      {order.paymentIntent.payment_method_types[0]}
    </p>

    <p className="lead small">
      <strong>Payment:</strong>
      {order.paymentIntent.status.toUpperCase()}
    </p>

    <p className="lead small">
      <strong>Orderd on:</strong>
      {new Date(order.paymentIntent.created * 1000).toLocaleString()}
    </p>

    {showStatus && (
      <p className="badge bg-primary text-white">STATUS: {order.orderStatus}</p>
    )}
  </div>
);
