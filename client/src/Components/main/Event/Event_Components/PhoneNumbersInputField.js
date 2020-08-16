import React from "react";

//Component for phone numbers of emergency services
const PhoneNumbersInputField = (props) => {
  const{setPhonenumbers}=props
  const{PoliceStationDetails,FireStationDetails,HospitalDetails}=props.phoneNumbers
 
  //Function for updating state of input values 
  const handleChange=(e)=>{
    const value=e.target.value
    const id=e.target.id
    setPhonenumbers({
      ...props.phoneNumbers,
      [id]:value,
    });
  }
 
 
  
  return (
      <div>
        <div className="input-field right-align">
        <input
        value={HospitalDetails}
        id="HospitalDetails"
        type="text"
        maxLength="30"
        onChange={handleChange}
        required
        />
        <label className="active" htmlFor="HospitalDetails">
        Hospital Phone Number
        </label>
    </div>
    <div className="input-field">
        <input
        value={PoliceStationDetails}
        id="PoliceStationDetails"
        type="text"
        maxLength="30"
        onChange={handleChange}
        required
        />
        <label className="active" htmlFor="PoliceStationDetails">
        Police Station Phone Number
        </label>
    </div>
    <div className="input-field">
        <input
        value={FireStationDetails}
        id="FireStationDetails"
        type="text"
        onChange={handleChange}
        maxLength="30"
        required
        />
        <label className="active" htmlFor="FireStationDetails">
        FireStation Phone Number
        </label>
    </div>
  </div>
  );
};

export default PhoneNumbersInputField;
