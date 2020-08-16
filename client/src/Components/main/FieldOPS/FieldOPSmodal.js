import React, { useState } from "react";
import { Accordion, Button, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { DELETE_FIELD_OPS } from "../../../module/CRUD";
import DocumentCard from "./DocumentCard";
const FieldOPS_modal = (props) => {
  //destructuring props
  const { nonAsyncUpdateAray, close, dropdown } = props;
  //setting state of component
  const [values, setValues] = useState({
    isDeleting: false,
    dropdownArray: dropdown,
    selectedFieldOPS: "",
    documentType: [
      "RPA Pilot Licence",
      "ROC",
      "Opertations Specification",
      "Certificate of registration",
      "RLA(RPAS Letter of approval)",
      "User manual for the RPA",
      "User manual for remote pilot station",
      "Safety Briefing",
      "Flight Authorisation Sheet",
      "Flight Folio",
      "On site assessment",
      "On site Risk Assessment",
      "Pre site Assessment",
      "Medical Certificate",
    ],
  });
  //destructing state 
  const { selectedFieldOPS, documentType, dropdownArray, isDeleting } = values;
  //Function for closing Confirm Modal
  const closeConfirmDeleteFieldOPS = () => {
    setValues((prevState) => ({
      ...prevState,
      isDeleting: false,
    }));
  };
  //Function for changing the selected FieldOPS
  const changeSelected = (e) => {
    const value = e;
    setValues((prevState) => ({
      ...prevState,
      selectedFieldOPS: value,
    }));
  };
  //Function for opening Confirm Modal
  const openConfirmDeleteFieldOPS = () => {
    //make sure the user has selected a fieldops
    if (selectedFieldOPS === "") {
      toast.warning("Select Field OPs to Delete");
    } else {
      setValues((prevState) => ({
        ...prevState,
        isDeleting: true,
      }));
    }
  };
  //Function for deleting a Field OPS
  const DeleteFieldOPS = async () => {
    //removing the selected fieldsOps to be deleted from fieldOPs array
    const filtered = dropdownArray.filter(function (value) {
      return value !== selectedFieldOPS;
    });

    /*since setValues is async I have to  pass the current array
       instead of awaiting for it to be updated in setState*/

    nonAsyncUpdateAray(filtered);
    //deleting the documents relatedto both the fieldOPs and the user
    try {
      const newArray = dropdownArray.filter(
        (item) => item !== selectedFieldOPS
      );
      const response = await DELETE_FIELD_OPS(selectedFieldOPS);
      setValues((prevState) => ({
        ...prevState,
        isDeleting: false,
        selectedFieldOPS: "",
        dropdownArray: newArray,
      }));
      toast.success(` ${response.data.message}`);
    } catch (e) {
      toast.warning(` ${e.response.data.message}`);
    }
  };

  return (
    <div className="my-modal-fieldOPS-bg">
      <div className="my-modal-fieldOPS">
        <div className="FieldOPS_dropdown_area" style={{ height: "150px" }}>
         

          <DropdownButton
            id="dropdown-item-button"
            title={
              isDeleting === true ? (
                <Spinner animation="border" variant="light" />
              ) : selectedFieldOPS === "" ? (
                "Select Field OPS"
              ) : (
                selectedFieldOPS
              )
            }
            disabled={dropdownArray.length===0}
            onSelect={changeSelected}
          >
          
            {dropdownArray.map((item) => (
              <Dropdown.Item eventKey={item} key={item}>
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          
          {isDeleting === true ? (
            <ConfirmModal
              confirm={DeleteFieldOPS}
              message={`By hitting confirm,all documents related to ${selectedFieldOPS} be Deleted`}
              close={closeConfirmDeleteFieldOPS}
            />
          ) : null}
          <Button
            variant="danger"
            id="Delete-Field-Ops"
            onClick={openConfirmDeleteFieldOPS}
          >
            Delete
          </Button>
          <Button variant="danger" className="closeModal" onClick={close}>
            Back
          </Button>
        </div>
        <Row className="justify-content-center">
          <Accordion>
            {documentType.map((item) => (
              <DocumentCard
                card_name={item}
                selectedFieldOPS={selectedFieldOPS}
                key={item}
              />
            ))}
          </Accordion>
        </Row>
      </div>
    </div>
  );
};

export default FieldOPS_modal;
