import React from "react";

function DeleteUserNotification({ message }) {
  const addStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };
  if (message === null) {
    return null;
  }
  return <div style={addStyle}>{message}</div>;
}

export default DeleteUserNotification;
