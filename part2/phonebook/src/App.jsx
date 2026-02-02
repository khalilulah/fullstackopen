import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import DisplayPerson from "./components/DisplayPerson";

const App = () => {
  // const [notes, setNotes] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findName, setFindName] = useState("");

  //add person
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

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    setPersons([...persons, newPerson]);
    setNewName(""); // clear input
    setNewNumber(""); // clear input
  };

  const findPerson = (e) => {
    const value = e.target.value;
    setFindName(value);
  };

  //fetch data
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleNameChange = (e) => setNewName(e.target.value);
  const handleNumberChange = (e) => setNewNumber(e.target.value);

  //FILTER FUNCTION
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
      {console.log(personsToShow)}
      <DisplayPerson personsToShow={personsToShow} />
    </div>
  );
};

export default App;
