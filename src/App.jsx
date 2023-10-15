import "./App.css";
import { useState } from "react";
import contactsData from "./contacts.json";
import Contact from "./components/contact";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));
  console.log(contacts);

  const handleAddContact = () => {
    if (contacts.length === contactsData.length) return;

    // const arrayOfIds = contacts.map(contact => contact.id)
    // const unknownContacts = contactsData.filter(contact => !arrayOfIds.includes(contact.id)
    // const randomContact = unknownContacts[Math.floor(Math.random() * unknownContacts.length)]
    // setContacts([...contacts,randomContact])
    // or :

    const randomContact =
      contactsData[Math.floor(Math.random() * contactsData.length)];

    if (contacts.includes(randomContact)) {
      handleAddContact();
    } else {
      setContacts([...contacts, randomContact]);
    }
  };

  const handleSortByName = () => {
    // setContacts(contacts.toSorted((a,b) => a.name.localCompare(b.name, undefined, {sensivity : "base"})))
    // or:

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
                <Contact
                  key={contact.id}
                  contact={contact}
                  handleDeleteContact={handleDeleteContact}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
