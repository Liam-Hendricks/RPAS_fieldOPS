import React from "react";
import { Form, Button, Row, Container } from "react-bootstrap";

//component for creating  name  
function CreateName(props) {
  const { confirm, onChange, close, value } = props;
  return (
    <div className="my-modal-bg" id={props.id}>
     
      <div className="my-modal">
        <Container style={{ width: "100%", height: "100%" }}>
          <Row className="justify-content-center" style={{ marginTop: "10px" }}>
            <Form.Control
              type="text"
              value={value}
              placeholder="Name"
              maxLength="36"
              onChange={onChange}
            />

            <Button variant="primary" onClick={confirm}>
              Confirm
            </Button>
            <Button
              variant="danger"
              className="closeModal"
              style={{ marginLeft: "5px" }}
              onClick={close}
            >
              Back
            </Button>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default CreateName;
