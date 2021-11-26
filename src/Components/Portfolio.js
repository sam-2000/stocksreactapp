import React from "react";

const Portfolio = (props) => {
  return (
    <>
      <h1>My Portfolio</h1>
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
            <h3>
              {c[0]}: {c[1]}
            </h3>
            <form onSubmit={(e) => props.sellStock(e)}>
              <button
                type="submit"
                style={{
                  marginLeft: "20px",
                  height: "20px",
                  width: "40px",
                }}
              >
                Sell
              </button>
              <input type="number" style={{ width: "30px" }} />
              <input style={{ display: "none" }} value={c[0]} />
            </form>
          </div>
        );
      })}
    </>
  );
};

export default Portfolio;
