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
  Row,
  Col,
} from "reactstrap";

const Portfolio = (props) => {
  return (
    <>
      <Row>
        <h3
          style={{
            fontSize: "30px",
            display: "flex",
            justifyContent: "right",
            paddingRight: "150px",
          }}
        >
          My Portfolio
        </h3>
      </Row>
      <br />
      {props.st.map((c) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "right",
              alignItems: "center",
            }}
          >
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col>
                    {c[0]} <Badge pill>{c[1]}</Badge>
                  </Col>

                  <Col>
                    <Form onSubmit={(e) => props.sellStock(e)}>
                      <InputGroup>
                        <Button
                          type="submit"
                          style={{
                            marginLeft: "20px",
                            height: "28px",
                            width: "55px",
                            backgroundColor: "red",
                          }}
                        >
                          Sell
                        </Button>
                        {"  "}
                        <Input type="number" style={{ height: "28px" }} />
                      </InputGroup>
                      <Input style={{ display: "none" }} value={c[0]} />
                    </Form>
                  </Col>
                </Row>
              </ListGroupItem>
            </ListGroup>

            <br />
          </div>
        );
      })}
    </>
  );
};

export default Portfolio;
