import React, { useState } from "react";
import axios from "axios";

function App() {
  const [val, setval] = useState([]);
  const [displayData, setdisplayData] = useState([]);
  const [name, setname] = useState("");
  const [quantity, setquantity] = useState(0);

  const getdata = () => {
    const itemvalues = localStorage.getItem("My portfolio");
    if (itemvalues) return JSON.parse(itemvalues);
    else return [];
  };
  const [st, setst] = useState(getdata);

  const addStock = (key) => setst([...st, key]);

  const getStocks = async () => {
    const header = new Headers();
    header.append("User-Agent", "request");

    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=QEOLM41Z6PNYL6YU/`,
        header
      )
      .then((res) => {
        var res1 = JSON.parse(JSON.stringify(res.data)).bestMatches;
        if (res1 && res1.length) {
          setval(res1);
        }
      });
  };
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setname(searchWord);
  };

  const handleChange = (e) => {
    const num = e.target.value;
    setquantity(num);
  };

  const displayDetails = (key) => {
    const stockItem = val.filter((currElem) => {
      var temp1 = JSON.parse(JSON.stringify(currElem));
      return temp1["1. symbol"] === key;
    });
    setdisplayData(stockItem);
  };

  React.useEffect(() => {
    localStorage.setItem("My portfolio", JSON.stringify(st));
  }, [st]);

  return (
    <div>
      <h1>My Portfolio</h1>
      {st.map((c) => {
        return (
          <>
            <h3>{c}</h3>
            <h3></h3>
          </>
        );
      })}
      <center>
        <div>
          <input
            type="text"
            placeholder="Search for Stocks"
            value={name}
            onChange={handleFilter}
          ></input>

          <button onClick={getStocks}>Search</button>

          {val.map((curElem) => {
            var temp1 = JSON.parse(JSON.stringify(curElem));

            return (
              <div
                key={temp1["1. symbol"]}
                style={{
                  display: "flex",
                  "flex-direction": "row",
                  "justify-content": "center",
                  "align-items": "center",
                }}
              >
                <h3
                  onClick={() => displayDetails(temp1["1. symbol"])}
                  style={{ margin: "5px" }}
                >
                  {temp1["2. name"]}
                </h3>
                <button
                  onClick={() => addStock(temp1["2. name"])}
                  style={{
                    "margin-left": "20px",
                    height: "20px",
                    width: "40px",
                  }}
                >
                  Add
                </button>
                <input type="number" style={{ width: "35px" }} />
              </div>
            );
          })}
        </div>
      </center>
      {displayData.map((i) => {
        var temp2 = JSON.parse(JSON.stringify(i));
        return (
          <div key={temp2["1. symbol"]}>
            <ul>
              <li>stocksymbol : {temp2["1. symbol"]}</li>
              <li>stockname : {temp2["2. name"]}</li>
              <li>stocktype : {temp2["3. type"]}</li>
              <li>region : {temp2["4. region"]}</li>
              <li>market opens at : {temp2["5. marketOpen"]}</li>
              <li>market closes at : {temp2["6. marketClose"]}</li>
              <li>timezone : {temp2["7. timezone"]}</li>
              <li>currency : {temp2["8. currency"]}</li>
              <li>matchScore : {temp2["9. matchScore"]}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default App;
