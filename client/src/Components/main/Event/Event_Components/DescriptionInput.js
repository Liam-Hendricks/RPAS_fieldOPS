import React from "react";
import { Form } from "react-bootstrap";

//Component for Event Name,Short Description and Decription
const DescriptionInput = (props) => {
  const { setEventNameandDesciptions } = props;
  const {
    description,
    eventName,
    shortDescription,
  } = props.EventNameandDesciptions;

  //Event Handler for updating event name input value in state
  const handleChangeEventName = (e) => {
    const value = e.target.value;

    setEventNameandDesciptions((prevState) => ({
      ...prevState,
      eventName: value,
    }));
  };
    //Event Handler for updating short description input value in state
  const handleChangeShortDescription = (e) => {
    const value = e.target.value;

    setEventNameandDesciptions((prevState) => ({
      ...prevState,
      shortDescription: value,
    }));
  };
    //Event Handler for updating description input value in state
  const handleChangeDescription = (e) => {
    const value = e.target.value;

    setEventNameandDesciptions((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

  return (
    <div>
      <div className="input-field right-align">
        <input
          value={eventName}
          id="eventName"
          type="text"
          maxLength="60"
          onChange={handleChangeEventName}
        />
        <label className="active" htmlFor="eventName">
          Event Name
        </label>
      </div>
      <Form.Group controlId="shortDescription">
        <Form.Label style={label}>Short Description</Form.Label>
        <Form.Control
          as="textarea"
          name="shortDescription"
          required
          onChange={handleChangeShortDescription}
          maxLength="126"
          value={shortDescription}
        />

        <Form.Group controlId="description">
          <Form.Label style={label}>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows="8"
            onChange={handleChangeDescription}
            required
            maxLength="517"
            value={description}
          />
        </Form.Group>
      </Form.Group>
    </div>
  );
};
const label = {
  float: "left",
  color: "black",
};

export default DescriptionInput;
