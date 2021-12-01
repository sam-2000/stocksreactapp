import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Input,
  InputGroup,
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";

const Portfolio = (props) => {
  return (
    <>
      <h3 style={{ fontSize: "30px" }}> My Portfolio</h3>
      <br />
      {props.st.map((c) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
              alignItems: "center",
            }}
          >
            <ListGroup>
              <ListGroupItem>
                {c[0]} <Badge pill>{c[1]}</Badge>
              </ListGroupItem>
            </ListGroup>
            <br />
            <Form onSubmit={(e) => props.sellStock(e)}>
              <InputGroup>
                <Button
                  type="submit"
                  style={{
                    marginLeft: "20px",
                    height: "28px",
                    width: "40px",
                    backgroundColor: "red",
                  }}
                >
                  Sell
                </Button>
                <Input
                  type="number"
                  style={{ width: "60px", height: "28px" }}
                />
              </InputGroup>
              <Input style={{ display: "none" }} value={c[0]} />
            </Form>
            <br />
          </div>
        );
      })}
    </>
  );
};

export default Portfolio;
