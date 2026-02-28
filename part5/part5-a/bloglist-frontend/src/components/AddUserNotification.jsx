import React from "react";

function AddUserNotification({ newName }) {
  const addStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  return <div style={addStyle}>Added {newName}</div>;
}

export default AddUserNotification;
