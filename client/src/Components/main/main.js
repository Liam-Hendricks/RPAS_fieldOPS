import React, { useState, useEffect } from "react";

import AccountModal from './Account/AccountModal';
import AdminModal from './Admin/AdminModal';
import { signout, isAuth } from "../../module/Helper";

import { toast } from "react-toastify";
import CreateName from "./CreateName";
import "react-toastify/dist/ReactToastify.min.css";
import Weather from "./Weather/Weather";
import { Spinner } from "react-bootstrap";
import EventCard from "./Event/EventCard";
import { DoorOpen } from "react-bootstrap-icons";
import FieldOPSmodal from "./FieldOPS/FieldOPSmodal";
import {
  LATEST_USER_DATA,
  GET_EVENTS,
  UPDATE_FIELD_OPS,
  DELETE_EVENT,
} from "../../module/CRUD";
import CreateEvent from "./Event/CreateEvent";

require("dotenv").config();

const Main = ({ history }) => {
  //setting the state for this component
  const [values, setValues] = useState({
    Auth: true,
    name: "",
    fieldOps: "",
    id: "",
    isOnAdmin:false,
    AccountModalIsOpen:false,
    renderthis: false,
    isMangining: false,
    isConFirming: false,
    isNaming: false,
    loaded: false,
    modalShow: false,
    fieldOpsArray: [],
    events: [],
    cardObject: {},
    isEditing: false,
    createNameID: "create-FieldOPS",
  });
  //destructuring values to access variable data
  const {
    AccountModalIsOpen,
    isEditing,
    renderthis,
    loaded,
    name,
    isMangining,
    isNaming,
    cardObject,
    fieldOps,
    fieldOpsArray,
    createNameID,
    events,
    isOnAdmin,
  } = values;

  //useEffect for running axios request once the component mounds
  useEffect(() => {
    //sign in function
    const signIn = async () => {
      try {
        //making a request for user details
        const response = await LATEST_USER_DATA();
        //making request for all events related to user
        const data = await GET_EVENTS();
        //setting the  state once we get the response
        setValues((prevState) => ({
          ...prevState,
          fieldOpsArray: response.data.FieldOPs,
          name: response.data.name,
          events: data.data,
          loaded: true,
        }));
      } catch (e) {
        toast.warning(` ${e.response.data.message}`);
      }
    };
    //running the signIn function
    signIn();
  }, []);

  /*
    Function for getting the latest user data,is
    a copy of the sign in function but is accessible
  */
  const latestUserData = async () => {
    try {
      const response = await LATEST_USER_DATA();
      //setting the state from response
      setValues((prevState) => ({
        ...prevState,
        fieldOpsArray: response.data.FieldOPs,
        name: response.data.name,
       
      }));
    } catch (e) {
      toast.warning(`${e.response.data.message}`);
    }
  };

  //Function for retrieving event cards for a user
  const getCards = async () => {
    try {
      const response = await GET_EVENTS();
      //setting the state from response
      if (isEditing === true) {
        setValues((prevState) => ({
          ...prevState,
          isEditing: false,
          renderthis: false,
          events: response.data,
        }));
      } else {
        setValues((prevState) => ({
          ...prevState,
          renderthis: false,
          events: response.data,
        }));
      }
    } catch (e) {
      toast.warning(`${e.response.data.message}`);
    }
  };
  //Function for signing out the user
  const signOut = () => {
    signout(() => history.push("/login"));

    setValues({ ...values, Auth: isAuth() });
  };
  //Function for editing cards by using the create event modal
  const EditCard = (object) => {
    setValues((prevState) => ({
      ...prevState,
      cardObject: object,
      renderthis: true,
      isEditing: true,
    }));
    openCreateEvent();
  };
  //onChange value is being set for creating field ops name
  const FieldsOpChange = (e) => {
    setValues({
      ...values,
      fieldOps: e.target.value,
    });
  };

  //Function for updating fieldOPs array in users profile
  const updateFieldOPsDB = async (e) => {
    try {
      const response = await UPDATE_FIELD_OPS(fieldOpsArray);
      toast.success(` ${response.data.message}`);
      latestUserData();
    } catch (e) {
      toast.warning(` ${e}`);
    }
  };
  //function for performing update on FieldOPs with array as input, instead of using values in state
  const nonAsyncUpdateAray = async (array) => {
    try {
      const response = await UPDATE_FIELD_OPS(array);
      toast.success(` ${response.data.message}`);
      latestUserData();
    } catch (e) {
      toast.warning(` ${e.response.data.message}`);
    }
  };
  //function for handling the confirm click of user once name is input
  const submitFieldOPs = (e) => {
    //checking if field is empty
    if (fieldOps !== "") {
      //finding it the name already exsist
      const filter = fieldOpsArray.filter((item) => {
        return item === fieldOps;
      });
      if (filter.length === 0) {
        toast.success(`Field Ops ${fieldOps} created`);
        //adding new FieldOPs name to array
        fieldOpsArray.push(fieldOps);
        //setting state
        setValues((prevState) => ({
          ...prevState,
          isNaming: false,
          fieldOps: "",
          fieldOpsArray: fieldOpsArray,
        }));
        //Running funciton to update users profile
        updateFieldOPsDB();
      } else {
        toast.warning(`FieldOPs name already taken`);
      }
    } else {
      toast.warning(`Name cannot be empty`);
    }
    //Stopping page from reloading
    e.preventDefault();
  };
  //event handler for opening createName modal
  const openCreateFieldOPs = () => {
    setValues((prevState) => ({
      ...prevState,
      isNaming: true,
    }));
  };
  //event handler for opening FieldOPSmodal
  const openManageFieldOPS = () => {
    setValues((prevState) => ({
      ...prevState,
      isMangining: true,
    }));
  };
  //event handler for closing createName modal
  const closeCreateFieldOPs = () => {
    setValues((prevState) => ({
      ...prevState,
      isNaming: false,
      fieldOps: "",
    }));
  };
  //event handler for closing AccountModal
  const closeAccountModal = () => {
    setValues((prevState) => ({
      ...prevState,
      AccountModalIsOpen: false,
      fieldOps: "",
    }));
  };
  //event handler for opening AccountModal
  const openAccountModal = () => {
    setValues((prevState) => ({
      ...prevState,
      AccountModalIsOpen: true,
      fieldOps: "",
    }));
  };
  //event handler for closing AdminModal
  const closeAdmin = () => {
    setValues((prevState) => ({
      ...prevState,
      isOnAdmin: false,
    }));
  };



//event handler for opening AadminModal
const openAdmin = () => {
  setValues((prevState) => ({
    ...prevState,
    isOnAdmin: true,
  }));
};
//event handler for closing FieldOPSmodal
const closeManageFieldOPS = () => {
  setValues((prevState) => ({
    ...prevState,
    isMangining: false,
  }));
};
  //event handler for closing CreateEvent Modal
  const closeCreateEvent = () => {
    if (isEditing === true) {
      setValues((prevState) => ({
        ...prevState,
        renderthis: false,
        isEditing: false,
      }));
    } else {
      setValues((prevState) => ({
        ...prevState,
        renderthis: false,
      }));
    }
  };

  //event handler for opening  EventCard modal
  const openCreateEvent = () => {
    //Do not allow users to create more than 9 event cards
    if (events.length < 9 || isEditing === true) {
      setValues((prevState) => ({
        ...prevState,
        renderthis: true,
      }));
      //display the modal
    } else {
      toast.warning("You may only have a maxmium of 9 events active");
      toast.warning("Delete an event to create a new one");
    }
  };

  const deleteEventCard = async (id) => {
    try {
      const response = await DELETE_EVENT(id);
      toast.success(`${response.data.message}`);
    } catch (e) {
      toast.warning(` ${e.response.data.message}`);
    }
    getCards();
  };
  return (
   
    <div className="main">
    
      {isMangining ? (
        <FieldOPSmodal
          nonAsyncUpdateAray={nonAsyncUpdateAray}
          close={closeManageFieldOPS}
          dropdown={fieldOpsArray}
        />
      ) : null}
      {renderthis ? (
        <CreateEvent
          isEditing={isEditing}
          cardObject={cardObject}
          close={closeCreateEvent}
          dropdown={fieldOpsArray}
          trigger={getCards}
        />
      ) : null}
      {isNaming ? (
        <CreateName
          onChange={FieldsOpChange}
          close={closeCreateFieldOPs}
          confirm={submitFieldOPs}
          value={fieldOps}
          id={createNameID}
        />
      ) : null}
      {AccountModalIsOpen?(
          <AccountModal  close={closeAccountModal} history={history}/>
        ):null}

       {isAuth() && isAuth().role === 'admin' && isOnAdmin?
       <AdminModal close={closeAdmin}/>:null}
      
      
      
      <div className="top">
     
        { isAuth() && isAuth().role === 'admin'?  <button className="adminbtn" onClick={openAdmin}>Admin</button>:null}
        <h1 className="welcomeMessage">
          {loaded === false ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            `${name}`
          )}
        </h1>
        <h2>
          <button className="nvbtn" onClick={openAccountModal}>Account</button>
        </h2>
        <h2>
          <button className="signoutbtn" onClick={signOut}>
            Sign out
            <DoorOpen
              color="white"
              size={20}
              style={{ width: "fit-content" }}
            />
          </button>
        </h2>
      </div>
      <div className="belowTop">
        <div className="marginsBelowTop">
          <button className="tpbtn" onClick={openManageFieldOPS}>
            Manage Fields OP
          </button>
         
        </div>

        <div className="marginsBelowTop">
          <button className="tpbtn" onClick={openCreateFieldOPs}>
            Create New Fields Op
          </button>
        </div>

      <div className="marginsBelowTop">
          <button className="tpbtn" onClick={openCreateEvent}>
            Create New Event
          </button>
        </div>
      </div>
        
    

      <div className="mid">
        <div className="EventCards">
          {events.length === 0
            ? null
            : isEditing === true
            ? null
            : events.map((objects) => (
                <EventCard
                  key={objects._id}
                  onclick={EditCard}
                  data={objects}
                  remove={deleteEventCard}
                />
              ))}
        </div>
        <div className="weatherData">
          <Weather />
        </div>
      </div>
    </div>

  );
};

export default Main;
