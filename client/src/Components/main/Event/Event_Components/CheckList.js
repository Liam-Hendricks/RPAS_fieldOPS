import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import CreateName from "../../CreateName";
import ChecklistModal from "./Checklist_Components/ChecklistModal";
import { Row, Col } from "react-bootstrap";
//Checklist component
const CheckList = (props) => {
  //Checklist object constructor
  function Checklist(name, item) {
    this.name = name;
    this.item = item;
  }
  const { array,setCheckListArray } = props;
  const [CreateChecklistName, setChecklistName] = useState("");
  const [values, setValues] = useState({
    ArrayContainingChecklist: array,
    TheChecklistBeingEdited: {},
    isCreatingCheckListName: false,
    isCurrentlyEditingAChecklist: false,
  });
  const {
    ArrayContainingChecklist,
    isCreatingCheckListName,
    isCurrentlyEditingAChecklist,

    TheChecklistBeingEdited,
  } = values;
  //Loading the Checklist data when component mounts
  useEffect(() => {
    const { isEditing, array } = props;

    const initialize = () => {
      if (isEditing) {
        setValues((prevState) => ({
          ...prevState,
          ArrayContainingChecklist: array,
        }));
      }
    };

    initialize();
  }, [props]);
 
  
  //Event Handler for opening CreateName Modal
  const handleOpenOfCreateName = () => {
    if (ArrayContainingChecklist.length < 3) {
      setValues((prevState) => ({
        ...prevState,
        isCreatingCheckListName: true,
      }));
    } else {
      toast.warning(
        `Maximum of ${ArrayContainingChecklist.length} Checklist Allowed`
      );
    }
  };
  //Event Handler for closing CreateName Modal
  const handleCloseOfCreateName = () => {
    setValues((prevState) => ({
      ...prevState,
      isCreatingCheckListName: false,
    }));
    setChecklistName("");
  };
  //Event Handler for opening checklist editor modal
  const handleOpenOfChecklistModal = (name) => {
    const getObject = ArrayContainingChecklist.filter((object) => {
      return object.name === name;
    });
    setValues((prevState) => ({
      ...prevState,
      TheChecklistBeingEdited: getObject[0],
      isCurrentlyEditingAChecklist: true,
    }));
  };
  //Event Handler for closing checklist editor modal
  const handleCloseOfChecklistModal = () => {
    setValues((prevState) => ({
      ...prevState,
      TheChecklistBeingEdited: {},
      isCurrentlyEditingAChecklist: false,
    }));
  };
  //Event Handler CreateName Modal input change
  const HandleCreateNameChange = (e) => {
    setChecklistName(e.target.value);
  };
  //function for deleteing a checklist 
  const deleteAChecklist = (e) => {
    const newArray = ArrayContainingChecklist.filter((item) => {
      return item.name !== e.target.id;
    });
    setValues((prevState) => ({
      ...prevState,
      ArrayContainingChecklist: newArray,
    }));
    setCheckListArray(newArray);
  };
  //function for updating the checklist array when a user finishes editing it 
  const updateObjectInCheckList = (object) => {
    const copy = ArrayContainingChecklist.filter((item) => {
      return item.name !== TheChecklistBeingEdited.name;
    });
    copy.push(object);
    setValues((prevState) => ({
      ...prevState,
      ArrayContainingChecklist: copy,
    }));
    setCheckListArray(copy);
  };
  //Function for creating a checklist 
  const submitNameofCheckList = (e) => {
    if (CreateChecklistName !== "") {
      const copy = ArrayContainingChecklist.filter((item) => {
        return item.name === CreateChecklistName;
      });

      if (copy.length !== 0) {
        toast.warning(`There is already a checklist with that name`);
        e.preventDefault();
      } else {
        const checklist = new Checklist(CreateChecklistName, []);
        ArrayContainingChecklist.push(checklist);
        setCheckListArray((prevState) => ({
          ...prevState,
          CheckListArray: ArrayContainingChecklist,
        }));
        setCheckListArray(ArrayContainingChecklist);
        setValues((prevState) => ({
          ...prevState,
          isCreatingCheckListName: false,
          ArrayContainingChecklist: ArrayContainingChecklist,
        }));
        setChecklistName("");

        e.preventDefault();
      }
    } else {
      toast.warning(`Name cannot be empty`);
    }

    e.preventDefault();
  };

  return (
    <div>
      {isCreatingCheckListName ? (
        <CreateName
          onChange={HandleCreateNameChange}
          close={handleCloseOfCreateName}
          confirm={submitNameofCheckList}
          value={CreateChecklistName}
          id={"create-Name-Checklist"}
        />
      ) : null}
      {isCurrentlyEditingAChecklist ? (
        <ChecklistModal
          close={handleCloseOfChecklistModal}
          object={TheChecklistBeingEdited}
          getObject={updateObjectInCheckList}
        />
      ) : null}
      <Button variant="info" onClick={handleOpenOfCreateName}>
        Create Checklist
      </Button>

      {ArrayContainingChecklist.length === 0
        ? null
        : ArrayContainingChecklist.map((item) => (
            <Row
              key={item.name}
              className="align-items-center"
              style={{ marginBottom: "5px" }}
            >
              <Col style={{ padding: 0 }}>
                <Card
                  bg={"dark"}
                  text="white"
                  key={item.name}
                  onClick={() => handleOpenOfChecklistModal(item.name)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Title style={{ marginBottom: "0" }}>
                    {item.name}
                  </Card.Title>
                </Card>
              </Col>
              <Col md={"auto"} style={{ paddingBottom: "5px" }}>
                <Button
                  variant="danger"
                  style={{ float: "right" }}
                  id={item.name}
                  onClick={deleteAChecklist}
                >
                  X
                </Button>
              </Col>
            </Row>
          ))}
    </div>
  );
};

export default CheckList;
