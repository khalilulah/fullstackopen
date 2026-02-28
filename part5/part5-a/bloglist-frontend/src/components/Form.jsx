import React from "react";

function Form({
  login,
  username,
  password,
  passwordOnChange,
  usernameOnChange,
}) {
  return (
    <div>
      <form onSubmit={login}>
        <label>
          username: <input value={username} onChange={usernameOnChange} />
        </label>
        <label>
          password{" "}
          <input type="password" value={password} onChange={passwordOnChange} />
        </label>

        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default Form;
