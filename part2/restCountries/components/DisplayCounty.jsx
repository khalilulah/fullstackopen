import React from "react";
import OneCountry from "./OneCountry";

function DisplayCounty({ country, setSelectedCountry }) {
  if (country.length > 10) {
    return <p>too many matches specify better</p>;
  }

  if (country.length === 1) {
    return <OneCountry toShow={country} />;
  }

  return (
    <div>
      {country.map((c) => (
        <div key={c.cca2}>
          <p>{c.name.common}</p>
          <button onClick={() => setSelectedCountry([c])}>show</button>
        </div>
      ))}
    </div>
  );
}

export default DisplayCounty;
