import React, { useState, useEffect, useRef } from "react";
import Dashboard from "./components/Dashboard";
import { formatData } from "./utils";
import "./styles.css";


export default function App() {
  const [currencies, setcurrencies] = useState([]);
  const [pair, setpair] = useState("");
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const [screen, setScreen]= useState(0)
  const ws = useRef(null);

  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");

    let pairs = [];

    const apiCall = async () => {
      await fetch(url + "/products")
        .then((res) => res.json())
        .then((data) => (pairs = data));
      
      let filtered = pairs.filter((pair) => {
        if (pair.quote_currency === "USD") {
          return pair;
        }
      });

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1;
        }
        if (a.base_currency > b.base_currency) {
          return 1;
        }
        return 0;
      });

      
      setcurrencies(filtered);

      first.current = true;
    };

    apiCall();
  }, []);

  useEffect(() => {
    if (!first.current) {
      
      return;
    }

    
    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    const fetchHistoricalData = async () => {
      let dataArr = [];
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data));
      
      let formattedData = formatData(dataArr);
      setpastData(formattedData);
    };

    fetchHistoricalData();

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }

      if (data.product_id === pair) {
        setprice(data.price);
      }
    };
  }, [pair]);

  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);

    setpair(e.target.value);
  };

  const change= () => {
    setScreen(1)
  }
  console.log(screen)
  return (
   <>
     {  screen==0?
          <div className="back">
              <div className="initial">
                <h2 >Welcome! to the  Crypto</h2>
              </div>

              <div class="main">
                  <h1 className="wtext">This is purely:</h1>
                   <div class="roller">
                      <span id="rolltext">SKILLS<br/>
                          COURAGE<br/>
                          CURIOSITY<br/>
                          TALENT
                      </span>
                    </div>         
              </div>

              <div className="real">
                <span className="text">to check prices:</span>
                <button onClick={change} className="button" >click</button>
              </div>
              <div className="image">
                <div>
                  <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQhReM3agpH8u4BM1GgfRHdYM50M9ufGr8A&usqp=CAU"/>
                  <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpRTucXos5INGlT2bTLWxFKqsm8PmHHJq-fA&usqp=CAU"/>
                </div>
                <div>
                  <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWvXR8kWxDug3xGS8h3N-kxKr8Pt1M78bKAQ&usqp=CAU"/>
                  <img className="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9a73UyA4NB2pLt0Wn9Ve2XwJmkSYOEMs6Hw&usqp=CAU"/>
                </div>
              </div>
            
          </div> 
          :
          <div className="container">
            {
              <select name="currency" value={pair} onChange={handleSelect} className="select" >
                {currencies.map((cur, idx) => {
                  return (
                    <option key={idx} value={cur.id}>
                      {cur.display_name}
                    </option>
                  );
                })}
              </select>
            }
            <Dashboard price={price} data={pastData} />
          </div>
      }
    </>
  );
}
