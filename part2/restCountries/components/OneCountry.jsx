import React from "react";

function OneCountry({ toShow }) {
  const country = toShow[0];

  const languages = Object.values(country.languages);

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>

      <h2>languages</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="150"
      />
    </div>
  );
}

export default OneCountry;
