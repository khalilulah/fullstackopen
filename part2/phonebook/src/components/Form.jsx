import React from "react";

function Form({
  addPerson,
  nameValue,
  nameOnChange,
  numValue,
  numberOnChange,
}) {
  return (
    <div>
      <form onSubmit={addPerson}>
        <label>
          name: <input value={nameValue} onChange={nameOnChange} />
        </label>
        <label>
          number{" "}
          <input type="number" value={numValue} onChange={numberOnChange} />
        </label>

        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default Form;
