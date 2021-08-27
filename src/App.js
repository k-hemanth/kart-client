import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  let products = [
    {
      id: 1,
      name: `Pina Colada`,
      img: `https://www.parhlo.com/wp-content/uploads/2020/04/pina-colada-1536x864.jpg.webp`,
      price: `29.7`,
    },
    {
      id: 2,
      name: ` Beetroot Smoothie`,
      img: `https://www.parhlo.com/wp-content/uploads/2020/04/beetroot-1536x1024.jpg.webp`,
      price: `11.4`,
    },
    {
      id: 3,
      name: `Lemonade`,
      img: `https://www.parhlo.com/wp-content/uploads/2020/04/frosted-lemonade.jpg.webp`,
      price: `35.2`,
    },
  ];

  const [currency, setCurrency] = useState("INR");
  const [currencyRateOfUSDToINR, setCurrencyRateOfUSDToINR] = useState(0);

  useEffect(() => {
    if (currency === "INR") {
      axios
        .get(
          `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}/latest/USD`
        )
        .then((data) => {
          setCurrencyRateOfUSDToINR(data.data?.conversion_rates?.INR);
        })
        .catch((error) => console.log(error));
    }
  }, [currency]);

  return (
    <React.Fragment>
      {/* {JSON.stringify(currencyRateOfUSDToINR)} */}
      <div className="cards">
        {React.Children.toArray(
          products.map((product) => {
            return (
              <div className="card">
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: "100%", height: "60%" }}
                />
                <h1>{product.name}</h1>
                <p className="price">
                  {currency === "INR"
                    ? `₹ ${(product.price * currencyRateOfUSDToINR).toFixed(2)}`
                    : `$ ${product.price}`}
                </p>
              </div>
            );
          })
        )}
        <div className="currency">
          Currency{"  "}
          <select
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
            }}
          >
            <option value="INR" key="INR">
              INR
            </option>
            <option value="USD" key="USD">
              USD
            </option>
          </select>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
