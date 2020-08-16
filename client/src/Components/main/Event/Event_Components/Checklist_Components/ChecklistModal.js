import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import CheckListItem from "./CheckListItem";
import { toast } from "react-toastify";
import isEmpty from "is-empty";
//Component for one checklist
const ChecklistModal = (props) => {
  const { object, close, getObject } = props;

  const [inputFieldValue, setInput] = useState("");
  const [values, setValues] = useState({
    inputFieldValue: "",
    todoItemsArray: object.item,
    CheckListObject: object,
  });
  const { todoItemsArray, CheckListObject } = values;
  //Object constructor for items on a checklist
  function Item(key, value) {
    this.key = key;
    this.value = value;
  }
  //Object constructor for a checklist 
  function Checklist(name, item) {
    this.name = name;
    this.item = item;
  }
  //Event handler for input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  //Function for adding item to checklist
  const addItem = () => {
    if (inputFieldValue !== "") {
      const Copy = todoItemsArray.filter(
        (item) => item.value === inputFieldValue
      );
      if (Copy.length === 0) {
        const item = new Item(inputFieldValue, inputFieldValue);
        todoItemsArray.push(item);
        const newObject = new Checklist(object.name, todoItemsArray);
        setValues((prevState) => ({
          ...prevState,
          CheckListObject: newObject,
        }));
        setInput("");
      } else {
        toast.warning("Item is already on checklist");
      }
    } else {
      toast.warning("Cannot an empty task");
    }
  };
  //function for deleting a item from checklist
  const deleteItem = (key) => {
    const itemArray = todoItemsArray.filter((item) => item.key !== key);

    const newObject = new Checklist(object.name, itemArray);

    setValues((prevState) => ({
      ...prevState,
      CheckListObject: newObject,
      todoItemsArray: itemArray,
    }));
  };
  const handleObjectChange = () => {
    getObject(CheckListObject);
    close();
  };
  return (
    <div className="my-modal-checklist-bg">
      <div className="my-modal-checklist">
        <Container style={{ padding: "15px", width: "100%", height: "100%" }}>
          <Row className="justify-content-center">
            <Form.Group controlId="formItem">
              <Form.Label>{object.name} Checklist</Form.Label>
              <Row className="justify-content-center">
                <Col md={"auto"}>
                  <Form.Control
                    type="item"
                    placeholder="Enter Task"
                    style={input}
                    value={inputFieldValue}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={"auto"}>
                  <Button variant="primary" onClick={() => addItem()}>
                    Add Task
                  </Button>
                </Col>
                <Col md={"auto"}>
                  <Button
                    variant="danger"
                    className="closeModal"
                    style={{ marginLeft: "5px" }}
                    onClick={handleObjectChange}
                  >
                    Back
                  </Button>
                </Col>
              </Row>

              {isEmpty(object)
                ? null
                : todoItemsArray.length === 0
                ? null
                : todoItemsArray.map((item) => (
                    <CheckListItem
                      item={item.value}
                      remove={deleteItem}
                      key={item.key}
                    />
                  ))}
            </Form.Group>
          </Row>
        </Container>
      </div>
    </div>
  );
};
const input = {
  width: "300px",
};
export default ChecklistModal;
