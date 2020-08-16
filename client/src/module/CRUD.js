import axios from "axios";
import { getCookie } from "./Helper";
/**
 * @function: GPS
 * @description: get the coordinates of a location
 * @access geocode api
 * @param {*} req url string
 * @param {*} res return response
 */
const GPS = async (Location) => {
  const params = new URLSearchParams({
    f: "json",
    singleLine: Location,
    outFields: "Match_addr,Addr_type",
  });
  const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?${params.toString()}`;

  return await axios({
    method: "GET",
    url: `/api/user/location`,
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    params: {
      url: url,
    },
  });
};

/**
 * @function: GETWEATHER
 * @description: Get Weather data using coordinates
 * @access openweathermap API
 * @param {*} req lat long coordinates
 * @param {*} res return response
 */
const GETWEATHER = async (x, y) => {
  return await axios({
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${y}&lon=${x}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}`,
  });
};
/**
 * @function: CREATE_EVENT
 * @description: Update a file from the logged in user
 * @access express server API
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const CREATE_EVENT = async (
  name,
  DateTime,
  location,
  FieldOpsSelected,
  ShortDescription,
  Description,
  Checklist,
  Police,
  FireStation,
  Hospital
) => {
  return await axios({
    method: "POST",
    url: "api/events/create",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    data: {
      name: name,
      DateTime: DateTime,
      Location: location,
      FieldOpsSelected: FieldOpsSelected,
      ShortDescription: ShortDescription,
      Description: Description,
      Checklist: Checklist,
      Police: Police,
      FireStation: FireStation,
      Hospital: Hospital,
    },
  });
};
/**
 * @function: UPDATE_EVENT
 * @description: Update an event card when user is finished editing it 
 * @access express server API
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const UPDATE_EVENT = async (
  id,
  name,
  DateTime,
  location,
  FieldOpsSelected,
  ShortDescription,
  Description,
  Checklist,
  Police,
  FireStation,
  Hospital
) => {
  return await axios({
    method: "PUT",
    url: "api/events/update",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    data: {
      id: id,
      name: name,
      DateTime: DateTime,
      Location: location,
      FieldOpsSelected: FieldOpsSelected,
      ShortDescription: ShortDescription,
      Description: Description,
      Checklist: Checklist,
      Police: Police,
      FireStation: FireStation,
      Hospital: Hospital,
    },
  });
};
/**
 * @function: LATEST_USER_DATA
 * @description: Update a file from the logged in user
 * @access express server API
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const LATEST_USER_DATA = async () => {
  return await axios({
    method: "GET",
    url: "api/user/latest_data",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
};
const GET_EVENTS = async () => {
  return await axios({
    method: "GET",
    url: "api/events/view",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
};
/**
 * @function: UPDATE_FIELD_OPS
 * @description: Update the users FieldOPs array
 * @access express server API
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const UPDATE_FIELD_OPS = async (fieldOpsArray) => {
  return await axios({
    method: "PUT",
    url: "api/user/update_fieldOPS",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    data: {
      FieldOPs: fieldOpsArray,
    },
  });
};
/**
 * @function: DELETE_EVENT
 * @description: Delete an event associated with a user
 * @access express server API
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const DELETE_EVENT = async (id) => {
  return await axios({
    method: "DELETE",
    url: "api/events/delete",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    data: {
      id: id,
    },
  });
};
/**
 * @function: DELETE_FIELD_OPS
 * @description: Delete a FieldOPS and all related Documents
 * @access express server API
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const DELETE_FIELD_OPS = async (selectedFieldOPS) => {
  return await axios({
    method: "DELETE",
    url: "api/documents/deleteFieldOPS",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    params: {
      FieldOps: selectedFieldOPS,
    },
  });
};
/**
 * @function: UPLOAD_DOCUMENT
 * @description: Update a file from the logged in user
 * @access express server API
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const UPLOAD_DOCUMENT = async (
  filename,
  Filedata,
  fileType,
  selectedFieldOPS,
  docType,
  options
) => {
  return await axios.post(
    "/api/documents/upload",

    {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("token")}`,
        data: {
          file: {
            name: filename,
            file: Filedata,
            type: fileType,
            FieldOps: selectedFieldOPS,
            docType: docType,
          },
        },
      },
    },
    options
  );
};
/**
 * @function: VIEW_DOCUMENT
 * @description: get a pdf file from database
 * @access express server API
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const VIEW_DOCUMENT = async (selectedFieldOPS, docType) => {
  return await axios({
    method:'GET',
    url:"api/documents/view",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
    params: {
      FieldOps: selectedFieldOPS,
      docType: docType,
    },
  });
};
/**
 * @function: DELETE_ACCOUNT
 * @description: Delete all data related to user
 * @access express server API
 *
 * @param {*} req user id from header token and file name
 * @param {*} res return response
 */
const DELETE_ACCOUNT =async () => {
  return await axios({
    method: "DELETE",
    url: "api/user/deleteAccount",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
   
  });

}

/**
 * @function: GET_USER_ACCOUNTS
 * @description: Get all user accounts
 * @access express server API
 *
 * @param {*} req admin id from header token 
 * @param {*} res return response
 */
const GET_USER_ACCOUNTS =async () => {
  return await axios({
    method: "GET",
    url: "api/admin/accounts",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
   
  });

}

/**
 * @function: ADMIN_UPDATE_ACCOUNT
 * @description: Update a user account from admin panel
 * @access express server API
 *
 * @param {*} req admin id from header token 
 * @param {*} res return response
 */
const ADMIN_UPDATE_ACCOUNT =async (name,email,password,id,role) => {
  return await axios({
    method: "PUT",
    url: "api/admin/update",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
   data:{
    name:name,
    email:email,
    password:password,
    id:id,
    role:role,
   }
  });

}
export {
  ADMIN_UPDATE_ACCOUNT,
  GET_USER_ACCOUNTS,
  DELETE_ACCOUNT,
  VIEW_DOCUMENT,
  UPLOAD_DOCUMENT,
  DELETE_FIELD_OPS,
  DELETE_EVENT,
  UPDATE_FIELD_OPS,
  GET_EVENTS,
  LATEST_USER_DATA,
  CREATE_EVENT,
  GPS,
  GETWEATHER,
  UPDATE_EVENT,
};
