import * as React from "react";
import * as ReactDOM from "react-dom";
import Loader from "./Loader";

it("renders <Loader /> without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Loader />, div);
  ReactDOM.unmountComponentAtNode(div);
});