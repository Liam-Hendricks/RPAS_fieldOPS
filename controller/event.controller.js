const jwt_decode = require("jwt-decode");
const EventCard = require("../models/EventCard.model");

/**
 * @function: createEventCard
 * @description: Create an event card and use user id as foreign key
 * @access documents
 *
 * @param {*} req token from header to get user,event card details from body
 * @param {*} res with creation status
 */

const createEventCard = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);

  const data = req.body;
  EventCard.find({ user: user.id, name: data.name }, { _id: false }, function (
    err,
    file
  ) {
    if (file.length !== 0) {
      res.status(500).send({ message: "Card Already Exsist" });
    } else {
      const event = new EventCard({
        user: user.id,
        name: data.name,
        DateTime: data.DateTime,
        Location: data.Location,
        FieldOpsSelected: data.FieldOpsSelected,
        ShortDescription: data.ShortDescription,
        Description: data.Description,
        Checklist: data.Checklist,
        Police: data.Police,
        FireStation: data.FireStation,
        Hospital: data.Hospital,
      });
      event.save(function (err) {
        if (err) {
          console.log(err);
          res
            .status(500)
            .send({ message: `Some error occured while creating card ${err}` });
        } else {
          //console.log(file);
          res.send({ message: `Event Card ${data.name} Created!` });
        }
      });
    }
  });
};

/**
 * @function: updateEvent
 * @description: update event document 
 * @access events
 *
 * @param {*} req token from header to get users and data from body
 * @param {*} res with update status
 */
const updateEvent = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);
  const data = req.body;
  EventCard.findOneAndUpdate(
    { user: user.id, _id: data.id },
    {
      name: data.name,
      DateTime: data.DateTime,
      Location: data.Location,
      FieldOpsSelected: data.FieldOpsSelected,
      ShortDescription: data.ShortDescription,
      Description: data.Description,
      Checklist: data.Checklist,
      Police: data.Police,
      FireStation: data.FireStation,
      Hospital: data.Hospital,
    },

    function (err) {
      if (err) {
        return res
          .status(501)
          .send({ message: `Event Card not upadated`, error: err });
      } else {
        res.send({ message: "Event Card updated" });
      }
    }
  );
};


/**
 * @function: deleteEvent
 * @description: delete event document 
 * @access events
 *
 * @param {*} req token from header to get users and event card id fron body
 * @param {*} res with delete status
 */
const deleteEvent = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);
  const data = req.body;
  EventCard.findOneAndDelete(
    { user: user.id, _id: data.id },
    function (err) {
      if (err) {
        return res
          .status(501)
          .send({ message: `Event Card not upadated`, error: err });
      } else {
        res.send({ message: "Event Card deleted" });
      }
    }
  );
};
/**
 * @function: findEvents
 * @description: get all events related to user
 * @access events
 *
 * @param {*} req token from header to get users 
 * @param {*} res with array of events
 */

const findEvents = (req, res) => {
    const token = req.headers.authorization;
    const user = jwt_decode(token.split(" ")[1]);
    
    EventCard.find( { user: user.id },{createdAt:false,updatedAt:false },function (err,file) {
       
        if (err) {
          return res
            .status(501)
            .send({ message: `Event Card not upadated`, error: err });
        } else {
          res.send(file);
        }
      }
    );
  };

module.exports = {
  deleteEvent,
  findEvents,
  createEventCard,
  updateEvent,
};
