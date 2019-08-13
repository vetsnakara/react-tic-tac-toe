import React from "react";
import ReactDOM from "react-dom";

import Game from "./Game";

import "./styles/index.css";

const root = document.querySelector("#root");

ReactDOM.render(<Game />, root);

if (process.env.NODE_ENV === "development") module.hot.accept();
