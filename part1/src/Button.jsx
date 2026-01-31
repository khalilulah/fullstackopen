import React from "react";

function Button({ onClick, title }) {
  return (
    <div>
      <button onClick={onClick}>{title}</button>
    </div>
  );
}

export default Button;
