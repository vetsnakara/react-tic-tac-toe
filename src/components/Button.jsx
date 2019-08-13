import React from "react";

function Button({ children, ...attrs }) {
  return <button {...attrs}>{children}</button>;
}

export default Button;
