import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
//Components
import Coin from "./Coin";

const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const App = () => {
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setItems(result.data);
    };
    fetchData();
  }, []);

  const filteredCoins = items.filter((item) =>
    item.name.toLowerCase().includes(text.toLowerCase())
  );

  //console.log(text);
  return (
    <div className="coin-app">
      <div className="coin-search">
        
          <h1 className="coin-text">Search a currency</h1>
          <form>
            <input
              className="coin-input"
              type="text"
              name="search"
              id="search"
              value={text}
              placeholder="Search"
              autoFocus
              onChange={(e) => setText(e.target.value)}
            ></input>
          </form>
        
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              price={coin.current_price}
              volume={coin.market_cap}
              priceChange={coin.price_change_percentage_24h}
              marketCap={coin.market_cap}
            />
          );
        })}
      </div>
      <p>{items.symbol}</p>
    </div>
  );
};

export default App;
