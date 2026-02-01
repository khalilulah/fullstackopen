import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import DisplayPerson from "./components/DisplayPerson";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "070325409" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findName, setFindName] = useState("");

  const addPerson = (e) => {
    e.preventDefault();

    const checkUser = persons.find((person) => person.name === newName);

    if (checkUser) {
      alert("a user already exists");
      return;
    }

    if (newName === "" || newNumber === "") {
      alert("fill all fields");
      return;
    }

    const newPerson = { name: newName, number: newNumber };

    setPersons([...persons, newPerson]);
    setNewName(""); // clear input
    setNewNumber(""); // clear input
  };

  const findPerson = (e) => {
    const value = e.target.value;
    setFindName(value);
  };

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const personsToShow = findName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(findName.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={findName} onChange={findPerson} />

      <Form
        addPerson={addPerson}
        nameValue={newName}
        nameOnChange={handleNameChange}
        numValue={newNumber}
        numberOnChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <DisplayPerson personsToShow={personsToShow} />
    </div>
  );
};

export default App;
