import "./App.css";
import { useState } from "react";
import contactsData from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  console.log(contacts);

  const handleAddContact = () => {
    const randomContact =
      contactsData[Math.floor(Math.random() * contactsData.length)];

    if (contacts.includes(randomContact)) {
      handleAddContact();
    } else {
      setContacts([...contacts, randomContact]);
    }
  };

  const handleSortByName = () => {
    const copy = [...contacts];
    copy.sort((contactA, contactB) => {
      return contactA.name.localeCompare(contactB.name, undefined, {
        sensitivity: "base",
      });
    });
    setContacts(copy);
  };

  const handleSortByPopulartity = () => {
    const copy = [...contacts];
    copy.sort((contactA, contactB) => {
      return contactB.popularity - contactA.popularity;
    });
    setContacts(copy);
  };

  const handleDeleteContact = (id) => {
    const contactsToKeep = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(contactsToKeep);
  };

  return (
    <>
      <div className="App">
        <h1>LAB | React IronContacts</h1>
        <button onClick={handleAddContact}>Add Random Contact</button>
        <button onClick={handleSortByPopulartity}>Sort by Popularity</button>
        <button onClick={handleSortByName}>Sort by Name</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won an Oscar</th>
              <th>Won an Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => {
              return (
                <>
                  <tr className="card">
                    <td key={contact.id}>
                      <img
                        src={contact.pictureUrl}
                        alt="`${contact.name}'s photo"
                      />
                    </td>
                    <td>{contact.name}</td>
                    <td>{contact.popularity.toFixed(2)}</td>
                    <td>{contact.wonOscar ? "🏆" : ""}</td>
                    <td>{contact.wonEmmy ? "🌟" : ""}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDeleteContact(contact.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
