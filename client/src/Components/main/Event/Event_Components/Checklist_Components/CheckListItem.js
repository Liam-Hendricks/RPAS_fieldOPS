import React from "react";
import { Card } from "react-bootstrap";

//Checklist Item component
function CheckListItem(props) {
  const { item,remove } = props;
  return (
    <Card style={cardS} bg='light' border='primary'  >
      <Card.Body style={{padding:0}} onClick={()=>remove(item)} >
        <h4>{item}</h4>
      </Card.Body>
    </Card>
  );
}
const cardS = {
  margin: "10px",
  maxHeight:'40px',
  cursor: "pointer"
};

export default CheckListItem;
