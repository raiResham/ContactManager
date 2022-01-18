const Contact = (props) => {
    const { id, name, phone, favourite } = props.contact;
  
    return (
      <tr>
        <td>
          {name}
          {favourite === 1 ? <span className="badge bg-primary">fav</span> : ""}
        </td>
        <td>{phone} </td>
        <td>
          <button type="button" onClick={() => props.editClickHandler(id)}>
            Edit
          </button>
          <button type="button" onClick={() => props.deleteClickHandler(id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  };
  
  export default Contact;
  