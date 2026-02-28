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
        <div>
          username: <input value={username} onChange={usernameOnChange} />
        </div>
        <div>
          password{" "}
          <input type="password" value={password} onChange={passwordOnChange} />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default Form;
