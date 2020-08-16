import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { GET_USER_ACCOUNTS } from "../../../module/CRUD";
import {
  Button,
  Row,
  Container,
  Col,
  Accordion,
  Spinner,
} from "react-bootstrap";
//Admin panel
const AdminModal = (props) => {
  const [userProfiles, setValue] = useState([]);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    const LoadProfiles = async () => {
      const response = await GET_USER_ACCOUNTS();

      setValue(response.data);
      setLoading(false);
    };

    LoadProfiles();
  }, []);
  //function for loading getting all user profiles
  const LoadProfiles = async () => {
    const response = await GET_USER_ACCOUNTS();

    setValue(response.data);
  };
  //Event handler for trigger a function
  const trigger = () => {
    LoadProfiles();
  };
  const { close } = props;

  return (
    <div className="my-modal-createEvent-bg">
      <div className="my-modal-Admin">
        <Container
          style={{
            width: "100%",
            height: "100%",
            padding: "15px",
          }}
        >
          <Row>
            <Col>
              <h1> User Accounts </h1>
            </Col>
            <Col>
              <Button variant="danger" className="pull-right" onClick={close}>
                Back
              </Button>
            </Col>
          </Row>

          <Row className="justify-content-center">
            {Loading ? (
              <Spinner animation="border" variant="dark" />
            ) : userProfiles.length === 0 ? (
              <h2
                style={{
                  color: "grey",
                }}
              >
                No use profiles to load
              </h2>
            ) : (
              <Accordion>
                {userProfiles.map((item) => (
                  <UserCard
                    data={item}
                    key={item.email}
                    card_name={item.email}
                    trigger={trigger}
                  />
                ))}
              </Accordion>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AdminModal;
