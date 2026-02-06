import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import DisplayPerson from "./components/DisplayPerson";
import phoneService from "./services/phones";

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
      if (window.confirm("Do you want change already user name?")) {
        const updatedPerson = {
          ...checkUser,
          number: newNumber,
        };

        phoneService
          .update(checkUser.id, updatedPerson)
          .then((returnedNote) => {
            setPersons(
              persons.map((person) =>
                person.name === checkUser.name ? returnedNote : person,
              ),
            );
          });
      } else {
        console.log(`Glad you're staying!`);
      }

      return;
    }

    if (newName === "" || newNumber === "") {
      alert("fill all fields");
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    phoneService.create(newPerson).then((response) => {
      console.log(response);
      setPersons(persons.concat(response));
      setNewName(""); // clear input
      setNewNumber(""); // clear input
    });
  };

  const findPerson = (e) => {
    const value = e.target.value;
    setFindName(value);
  };

  // delete number function
  const deletePerson = (id) => {
    if (window.confirm("Do you want to delete number")) {
      phoneService.deleteNumber(id).then((response) => {
        console.log(response);
        setPersons(persons.filter((person) => person.id !== id));
      });
    } else {
      console.log(`Glad you're staying!`);
    }
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
      <DisplayPerson
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
