import React, { useState } from "react";
import { Accordion, Button, Card, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { ADMIN_UPDATE_ACCOUNT } from "../../../module/CRUD";

//This component handles the user date the admin is viewing and changing
const UserCard = (props) => {
  const { card_name, trigger } = props;
  const { email, name, role, _id } = props.data;
  const [values, setValues] = useState({
    Role: role,
    Name: name,
    Email: email,
    Password: "",
    isLoading: false,
  });
  
  const { Role, Name, Email, Password, isLoading } = values;
  //function for triggering and update of the users profile
  const updateUser = (e) => {
    setValues((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    runUpdate(Name, Email, Password, _id, Role);

    e.preventDefault();
  };
  //function for passing details to CRUD function and handling call back errors
  const runUpdate = async (Name_, Email_, Pass_, id_, Rol_) => {
    try {
      const response = await ADMIN_UPDATE_ACCOUNT(
        Name_,
        Email_,
        Pass_,
        id_,
        Rol_
      );
      toast.success(response.data.message);
      setValues((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    } catch (e) {
      toast.warning(e.reponse.data.message);
    }
    trigger();
  };
  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <Card>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="info" eventKey={card_name}>
          {card_name}
        </Accordion.Toggle>
      </Card.Header>

      <Accordion.Collapse eventKey={card_name}>
        <Card.Body>
          <form onSubmit={updateUser}>
            <div className="form-group row">
              <label className="text-muted col-form-label">Role</label>
              <div className="col-sm-10">
                <input
                  disabled
                  defaultValue={Role}
                  type="text"
                  style={{ cursor: "not-allowed" }}
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="text-muted col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  value={Name}
                  onChange={handleChange("Name")}
                  type="text"
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group row ">
              <label className="text-muted col-form-label">Email</label>
              <div className="col-sm-10">
                <input
                  disabled
                  defaultValue={Email}
                  type="email"
                  className="form-control"
                  style={{ cursor: "not-allowed" }}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="text-muted col-form-label">Password</label>
              <div className="col-sm-10">
                <input
                  onChange={handleChange("Password")}
                  value={Password}
                  type="password"
                  className="form-control"
                />
              </div>
            </div>

            <div>
              <button className="btn btn-primary" type="submit">
                {isLoading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default UserCard;
