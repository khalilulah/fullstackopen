import React from "react";
import phoneService from "../services/phones";

function DisplayPerson({ personsToShow, deletePerson }) {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.id} style={{ display: "flex" }}>
          <p>{person.name}</p>: <p>{person.number}</p>
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  );
}

export default DisplayPerson;
