const jwt_decode = require("jwt-decode");
const User = require("../models/user.model.js");
const Document=require('../models/document.model.js');
const EventCard=require('../models/EventCard.model.js');
const axios = require("axios");


/**
 * @function: updateFieldOps
 * @description: update the users FildOPS array 
 * @access documents
 *
 * @param {*} req token from header to get user and FieldOPS array 
 * @param {*} res with file
 */
const updateFieldOps = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);
  User.findByIdAndUpdate(
    { _id: user.id },
    { FieldOPs: req.body.FieldOPs },
    function (err) {
      if (err) {
        return res.status(400).json({
          message: `Failed update Field OPs Error:${err}`,
        });
      }
      return res.status(201).json({
        message: "User FieldOps updated",
      });
    }
  );
};


/**
 * @function: LatestUserData
 * @description: Get the users data 
 * @access user
 *
 * @param {*} req token from header to get user
 * @param {*} res with user data
 */
const LatestUserData = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);
  User.findById({ _id: user.id }, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: `failed to get user data ${err}`,
      });
    } else {
      res.send(user);
    }
  });
};

/**
 * @function: Location
 * @description: Get the location data of place entered by user
 * @access Arcgis Geocoding API
 *
 * @param {*} req pass url 
 * @param {*} res Location data
 */
const Location = async (req, res) => {
  const url = req.query.url;

  try {
    const token = await axios({
      method: "GET",
      url: `https://www.arcgis.com/sharing/oauth2/token?client_id=${process.env.ARCGIS_CLIENT_ID}&grant_type=client_credentials&client_secret=${process.env.ARCGIS_CLIENT_SECRET}&f=pjson`,
    });
    try {
      const response = await axios({
        method: "GET",
        url: url,
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
        },
      });
      res.send(response.data);
    } catch (e) {
      res.send(error);
    }
  } catch (e) {
    res.send(error);
  }
};


/**
 * @function: DeleteAccount
 * @description: Delete all user data when account is deleted 
 * @access user,document,EventCard
 *
 * @param {*} req token from header to get user id
 * @param {*} res error messages
 */
const DeleteAccount = async(req,res)=>{
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);
  try{
    await User.deleteMany({ _id: user.id },function (err) {
      if (err) {
        return res.status(400).json({
          message: `Failed to Delete User`,
        });
      }
    });

    await Document.deleteMany({ user: user.id },function (err) {
      if (err) {
        return res.status(400).json({
          message: `No Documents to Delete${err}`,
        });
      } 
    });
    await EventCard.deleteMany({user: user.id },function (err) {
      if (err) {
        return res.status(400).json({
          message: `No Events to Delete  ${err}`,
        });
      } 
    });
    res.send({message:'Account Had been Deleted'});
  }catch(e){
    return res.status(400).json({
      message: `Failed to remove Account ${err}`,
    });
  }
}

module.exports = {
  DeleteAccount,
  updateFieldOps,
  LatestUserData,
  Location,
};
