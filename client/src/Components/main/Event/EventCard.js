import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { Card, Spinner } from "react-bootstrap";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
//Event Card Component
const EventCard = (props) => {
  //setting state of component
  const [selectedDate, handleDateChange] = useState();
  const [spinner, ActivateSpinner] = useState(false);
  //When component is mounted ,set the time for the object details
  useEffect(() => {
    
   
    const changeTime=()=>{
      const { data } = props;
      handleDateChange(new Date(data.DateTime));
    }
    changeTime();
  },[props]);
  //destructure props
  const { data, remove, onclick } = props;
  
  const action = (id) => {
    remove(id);
    ActivateSpinner(true);
  };
  return (
    <Card className="Event" style={style} >
      <button className="redtbtn" onClick={() => action(data._id)}>
       
        {spinner ? <Spinner animation="border" variant="light" /> : `Delete`}
      </button>
      <Card.Body
        id="1234"
        style={{ float: "left" }}
        onClick={() => onclick(data)}
      >
        <Card.Title><h3>{data.name}</h3></Card.Title>
        <h6>
        
          <Card.Subtitle>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DateTimePicker
                style={{ paddingBottom: "15px" }}
                lable="Date and Time"
                variant="inline"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </Card.Subtitle>
        </h6>
        <Card.Text clasName="text-break" style={{ textAlign: "left"}}>

          <h6>The event is taking place at {data.Location}</h6>
         
          <h6> Number of checklist:{data.Checklist.length}</h6>
          
          {data.ShortDescription}
    
          
        
          <br />
         
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
const style={
  borderRadius:'15px',
  width: "30rem",
  height: "18rem",
  position: "relative",
  cursor: "pointer"
}

export default EventCard;
