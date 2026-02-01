import React from "react";

function Filter({ value, onChange }) {
  return (
    <div>
      <div>
        filter: <input value={value} onChange={onChange} />
      </div>
    </div>
  );
}

export default Filter;
