'use client';
import React from 'react';

const PayChangu = () => {
  const handlePayment = async () => {
    const txRef = Math.floor(Math.random() * 1000000000 + 1);

    const payload = {
      amount: "100",
      currency: "MWK",
      email: "yourmail@example.com",
      first_name: "Kelvin",
      last_name: "Banda",
      callback_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
      return_url: "https://webhook.site",
      tx_ref: txRef.toString(),
      customization: {
        title: "Test Payment",
        description: "Payment Description",
      },
      meta: {
        uuid: "uuid",
        response: "Response"
      }
    };

    try {
      const res = await fetch("/api/paychangu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("Payment response:", data);

      if (data.payment_url) {
        window.location.href = data.payment_url;
      }

    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return <button onClick={handlePayment}>Pay Now</button>;
};

export default PayChangu;
