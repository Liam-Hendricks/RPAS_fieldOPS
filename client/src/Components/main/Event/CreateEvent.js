import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import WeatherCard from "./Event_Components/WeatherCard";
import DescriptionInput from "./Event_Components/DescriptionInput";
import PhoneNumbersInputField from "./Event_Components/PhoneNumbersInputField";
import { CREATE_EVENT, UPDATE_EVENT } from "../../../module/CRUD";
import { Form, Spinner } from "react-bootstrap";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { toast } from "react-toastify";
import CheckList from "./Event_Components/CheckList";
import {
  Button,
  Row,
  Container,
  Col,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
//Component for Creating and Editing Event Cards
const CreateEvent = (props) => {
  //setting state for component
  const { close, dropdown, trigger,isEditing } = props;
  const [values, setValues] = useState({
    selectedFieldOPS: "",
    Location: "",
    saving: false,
    id: "",
  });
  //state for date time picker
  const [selectedDate, handleDateChange] = useState(new Date());
  //state for EventNameandDesciptions component
  const [EventNameandDesciptions, setEventNameandDesciptions] = useState({
    description: "",
    eventName: "",
    shortDescription: "",
  });
  //state for phoneNumber component
  const [phoneNumbers, setPhonenumbers] = useState({
    PoliceStationDetails: "",
    FireStationDetails: "",
    HospitalDetails: "",
  });
  //state for Checklist component
  const [CheckListArray,setCheckListArray]=useState([]);
  const {
    saving,
    Location,
    selectedFieldOPS,
    id,
  } = values;
  //If the user is editing a card load the state of the card into component 
  useEffect(() => {
    const { cardObject, isEditing } = props;

    const run = () => {
      if (isEditing === true) {
        handleDateChange(cardObject.DateTime);

        setEventNameandDesciptions((prevState) => ({
          ...prevState,
          eventName: cardObject.name,
          shortDescription: cardObject.ShortDescription,
          description: cardObject.Description,
        }));
        setPhonenumbers((prevState) => ({
          ...prevState,
          PoliceStationDetails: cardObject.Police,
          FireStationDetails: cardObject.FireStation,
          HospitalDetails: cardObject.Hospital,
        }));
        setCheckListArray(cardObject.Checklist)
        setValues((prevState) => ({
          ...prevState,
          Location: cardObject.Location,
          selectedFieldOPS: cardObject.FieldOpsSelected,
         
          id: cardObject._id,
        }));
      }
    };
    run();
  }, [props]);
  //Event handler for Location input Field
  const changeInput = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };
  //Event handler for dropdown
  const titleChange = (e) => {
    setValues((prevState) => ({
      ...prevState,
      selectedFieldOPS: e,
    }));
  };

  //Function for submiting a details 
  const mySubmit = async (e) => {
    e.preventDefault();
    if (selectedFieldOPS !== "") {
      setValues((prevState) => ({
        ...prevState,
        saving: true,
      }));
      
      if (isEditing) {
        try {
          const response = await UPDATE_EVENT(
            id,
            EventNameandDesciptions.eventName,
            selectedDate,
            Location,
            selectedFieldOPS,
            EventNameandDesciptions.shortDescription,
            EventNameandDesciptions.description,
            CheckListArray,
            phoneNumbers.PoliceStationDetails,
            phoneNumbers.FireStationDetails,
            phoneNumbers.HospitalDetails
          );

          setValues((prevState) => ({
            ...prevState,
            saving: false,
          }));
          toast.success(`${response.data.message}`);
          trigger();
        } catch (e) {
          setValues((prevState) => ({
            ...prevState,
            saving: false,
          }));
          toast.warning(`${e.response.data.message}`);
        }
      } else {
        try {
          const response = await CREATE_EVENT(
            EventNameandDesciptions.eventName,
            selectedDate,
            Location,
            selectedFieldOPS,
            EventNameandDesciptions.shortDescription,
            EventNameandDesciptions.description,
            CheckListArray,
            phoneNumbers.PoliceStationDetails,
            phoneNumbers.FireStationDetails,
            phoneNumbers.HospitalDetails
          );
          setValues((prevState) => ({
            ...prevState,
            saving: false,
          }));
          toast.success(`${response.data.message}`);
          trigger();
        } catch (e) {
          setValues((prevState) => ({
            ...prevState,
            saving: false,
          }));
          toast.warning(`${e.response.data.message}`);
        }
      }
    } else {
      toast.warning(`Please select a Field Ops before saving`);
    }
  };

  return (
    <div className="my-modal-createEvent-bg">
      <div className="my-modal-createEvent">
        <Container style={{ padding: "15px", width: "100%", height: "100%" }}>
          <Form onSubmit={mySubmit}>
            <Row>
              <Col xs={{span:5, order: 1 }}>
                <Row>
                  <Col>
                    <div className="input-field">
                      <input
                        value={Location}
                        id="Location"
                        type="text"
                        maxLength="52"
                        onChange={changeInput}
                      />
                      <label className="active" htmlFor="location">
                        Location
                      </label>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs={{ order: 6 }} md='auto'>
                <DropdownButton
                  style={{ paddingTop: "20px" }}
                  id="dropdown-item-button"
                  title={
                    selectedFieldOPS === ""
                      ? "Select Field OPS"
                      : selectedFieldOPS
                  }
                  disabled={dropdown.length===0}
                  onSelect={titleChange}
                >
                  {dropdown.map((item) => (
                    <Dropdown.Item eventKey={item} key={item}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Col>
              <Col xs={{order: 12}} md={{span:'auto',offset:4}} style={{ paddingTop: "20px" }}>
                <Button variant="danger" className="closeModal" onClick={close}>
                  Back
                </Button>
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingLeft: "0" }} className="text-left">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    style={{ paddingBottom: "15px" }}
                    lable="Date and Time"
                    variant="inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>

                <DescriptionInput
                  EventNameandDesciptions={EventNameandDesciptions}
                  setEventNameandDesciptions={setEventNameandDesciptions}
                 
                />
              </Col>
              <Col className="text-right">
                <WeatherCard Location={Location} />
              </Col>
            </Row>

            <Row>
              <Col xs={{ order: 1 }} sm={3}>
                <PhoneNumbersInputField
                  phoneNumbers={phoneNumbers}
                  setPhonenumbers={setPhonenumbers}
                 
                />
              </Col>
              <Col xs={{ order: 6 }} sm={6} style={myAuto}>
                <Button variant="info" type="submit">
                  {saving === true ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    `Save`
                  )}
                </Button>
              </Col>
              <Col xs={{ order: 12 }}>
                <CheckList
                  array={CheckListArray}
                  isEditing={isEditing}
                  setCheckListArray={setCheckListArray}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
};
const myAuto = {
  marginTop: "auto",
  marginBottom: "auto",
};


export default CreateEvent;
