import React, { useState, useEffect } from "react";
import axios from "axios";
import Wallet from "./Components/wallet";
import Portfolio from "./Components/Portfolio";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Form,
  List,
  ListGroupItem,
  FormGroup,
  ListGroup,
  Badge,
  Row,
  Col,
  Card,
  CardBody,
  CardGroup,
} from "reactstrap";

function App() {
  const [val, setval] = useState([]);
  const [displayData, setdisplayData] = useState([]);
  const [name, setname] = useState("");

  const getprice = () => {
    const pricevalue = localStorage.getItem("rem balance");
    if (pricevalue) return pricevalue;
    else return Number(10000);
  };

  const [price, setprice] = useState(getprice);

  const getdata = () => {
    const itemvalues = localStorage.getItem("My portfolio");
    if (itemvalues) return JSON.parse(itemvalues);
    else return [];
  };

  const [st, setst] = useState(getdata);

  const addStock = (e) => {
    e.preventDefault();
    var quantity = e.target[1].value;
    var name1 = String(e.target[2].value);
    var temp = true;

    st.map((c) => {
      if (c[0] === name1) {
        c[1] += Number(quantity);
        var updatedPrice = price - 100 * Number(quantity);
        setprice(updatedPrice);
        setst([...st]);
        temp = false;
      }
    });
    if (temp) {
      var list = [name1, Number(quantity)];
      var updatedPrice = price - 100 * Number(quantity);
      setprice(updatedPrice);
      setst([...st, list]);
    }
  };

  const sellStock = (e) => {
    e.preventDefault();
    var sellquantity = e.target[1].value;
    var sellstock = e.target[2].value;

    st.map((c) => {
      if (c[0] === sellstock) {
        c[1] -= Number(sellquantity);
        var updatedPrice = price + 100 * Number(sellquantity);
        setprice(updatedPrice);
        setst([...st]);
      }
    });
  };

  const getStocks = async () => {
    axios
      .get(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${name}&apikey=QEOLM41Z6PNYL6YU/`
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

  const displayDetails = (key) => {
    const stockItem = val.filter((currElem) => {
      var temp1 = JSON.parse(JSON.stringify(currElem));
      return temp1["1. symbol"] === key;
    });
    setdisplayData(stockItem);
  };

  useEffect(() => {
    localStorage.setItem("My portfolio", JSON.stringify(st));
  }, [st]);

  useEffect(() => {
    localStorage.setItem("rem balance", price);
  }, [price]);

  return (
    <div>
      <center>
        <div>
          <Row>
            <Col sm="5">
              <Card>
                <CardBody>
                  <InputGroup>
                    <InputGroupText>
                      <Input
                        type="text"
                        placeholder="Search for Stocks"
                        value={name}
                        onChange={handleFilter}
                      />
                    </InputGroupText>

                    <Button onClick={getStocks}>Search</Button>
                  </InputGroup>

                  {val.map((curElem) => {
                    var temp1 = JSON.parse(JSON.stringify(curElem));

                    return (
                      <div
                        key={temp1["1. symbol"]}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "left",
                          alignItems: "left",
                        }}
                      >
                        <ListGroup>
                          <ListGroupItem>
                            <Row>
                              <Col>
                                <h4
                                  onClick={() =>
                                    displayDetails(temp1["1. symbol"])
                                  }
                                  style={{ margin: "5px" }}
                                >
                                  {temp1["1. symbol"]}
                                </h4>
                              </Col>
                              <Col>
                                <Form onSubmit={(e) => addStock(e)}>
                                  <InputGroup>
                                    <Button
                                      type="submit"
                                      style={{
                                        marginLeft: "20px",
                                        height: "28px",
                                        width: "65px",
                                        backgroundColor: "lightgreen",
                                      }}
                                    >
                                      Add
                                    </Button>
                                    <Input
                                      type="number"
                                      style={{ height: "28px" }}
                                    />
                                    <Input
                                      style={{ display: "none" }}
                                      value={temp1["1. symbol"]}
                                    />
                                  </InputGroup>
                                </Form>
                              </Col>
                            </Row>
                          </ListGroupItem>
                        </ListGroup>
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            </Col>
            <Col sm="3">
              <Card>
                <CardBody>
                  <Wallet price={price} />
                  <br />
                  {displayData.map((i) => {
                    var temp2 = JSON.parse(JSON.stringify(i));
                    return (
                      <div key={temp2["1. symbol"]}>
                        <List>
                          <ul>
                            <li>stocksymbol : {temp2["1. symbol"]}</li>
                            <li>stockname : {temp2["2. name"]}</li>
                            <li>stocktype : {temp2["3. type"]}</li>
                            <li>region : {temp2["4. region"]}</li>
                            <li>market opens at : {temp2["5. marketOpen"]}</li>
                            <li>
                              market closes at : {temp2["6. marketClose"]}
                            </li>
                            <li>timezone : {temp2["7. timezone"]}</li>
                            <li>currency : {temp2["8. currency"]}</li>
                            <li>matchScore : {temp2["9. matchScore"]}</li>
                          </ul>
                        </List>
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            </Col>
            <Col sm="4">
              <Card>
                <CardBody>
                  <Portfolio st={st} sellStock={sellStock} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </center>
    </div>
  );
}

export default App;
