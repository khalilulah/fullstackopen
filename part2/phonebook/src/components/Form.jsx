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
        <div>
          name: <input value={nameValue} onChange={nameOnChange} />
        </div>
        <div>
          number{" "}
          <input type="number" value={numValue} onChange={numberOnChange} />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
}

export default Form;
