import React from "react";

function DisplayPerson({ personsToShow }) {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name} style={{ display: "flex" }}>
          <p>{person.name}</p>: <p>{person.number}</p>
        </div>
      ))}
    </div>
  );
}

export default DisplayPerson;
