import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Form from "./components/Form";
import DisplayPerson from "./components/DisplayPerson";
import phoneService from "./services/phones";
import AddUserNotification from "./components/AddUserNotification";
import DeleteUserNotification from "./components/DeleteUserNotification";

const App = () => {
  // const [notes, setNotes] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [findName, setFindName] = useState("");
  const [addMessage, setAddMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const theError = () => {
    setAddMessage(true);
    setTimeout(() => {
      setAddMessage(false);
    }, 2000);
  };

  //add person
  const addPerson = (e) => {
    e.preventDefault();
    const checkUser = persons.find((person) => person.name === newName);

    if (checkUser) {
      //pop up if user already exists
      if (
        window.confirm(
          `${checkUser.name} is already added to phonebook, replace the old number with a new one?`,
        )
      ) {
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
            theError();
          })
          .catch((error) => {
            setErrorMessage(
              `Note '${checkUser.name}' was already removed from server`,
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 2000);
          });
      } else {
        console.log(`Glad you're staying!`);
      }

      return;
    }

    // if any of the form field is empty
    if (newName === "" || newNumber === "") {
      alert("fill all fields");
      return;
    }

    //add person
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    phoneService.create(newPerson).then((response) => {
      theError();
      setPersons(persons.concat(response));
      setNewName(""); // clear input
      setNewNumber(""); // clear input
    });
  };

  //find person
  const findPerson = (e) => {
    const value = e.target.value;
    setFindName(value);
  };

  // delete number function
  const deletePerson = (person) => {
    const { name, id } = person;
    if (window.confirm(`Delete ${name}`)) {
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
    axios
      .get("https://fullstackopen-t3ih.onrender.com/api/persons")
      .then((response) => {
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
      {addMessage ? <AddUserNotification newName={newName} /> : null}
      <DeleteUserNotification message={errorMessage} />

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
