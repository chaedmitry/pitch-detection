import React from "react";
import ReactDOM from "react-dom";
import App from "./_app";

const IndexPage = () => {
  if (typeof window !== "undefined") {
    return (
      ReactDOM.render(<App />, document.getElementById("root"))
    )
  }
};
export default IndexPage;