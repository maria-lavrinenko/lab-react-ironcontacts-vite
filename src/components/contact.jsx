function Contact({ contact, handleDeleteContact }) {
  return (
    <tr key={contact.id}>
      <td>
        <img src={contact.pictureUrl} alt="`${contact.name}'s photo" />
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
  );
}

export default Contact;
