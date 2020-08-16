// Import Models
const Document = require("../models/document.model");
const jwt_decode = require("jwt-decode");
const fileType = ["application/pdf"];

/**
 * @function: viewDocument
 * @description: View file from the logged in user
 * @access documents
 *
 * @param {*} req token from header to get user,file name from body
 * @param {*} res with file
 */

const viewFile = function (req, res) {
  /*
  TODO:switch over to token autorisation
  */
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);

  Document.findOne({ user: user.id, FieldOps: req.query.FieldOps ,docType:req.query.docType},{ _id: false },function (err, file) {
      if (err) {
         res.send({ message: "No document Found" });
      }
      if(file) {
         res.send({       
           file});
      }
      else{
        res.send([])
      }
    }
  );
};

/**
 * @function: fieldOPSDOCS
 * @description: View file from the logged in user
 * @access documents
 *
 * @param {*} req token from header to get user,file name from body
 * @param {*} res with file
 */

const fieldOPSDOCS = function (req, res) {
  
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);

  Document.find({ user: user.id, FieldOps: req.query.FieldOps  },{ _id: false },function (err, file) {
      if (err) {
        console.log(err);
        res.status(500).send({ message: "Some error occurred while retrieving documents" });
      } else {
         res.send(file);
      }
    }
  );
};

/**
 * @function: uploadFile
 * @description: Create File if doesn't exsist or update exsisting
 * @access documents
 *
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
const uploadFile = (req, res) => {
  const token = req.body.headers.Authorization;
  const user = jwt_decode(token.split(" ")[1]);
 
  if (req.body.headers.data.file.file == null) return;
  const data = req.body.headers.data.file;
  if (data.file != null && fileType.includes(data.type)) {
    Document.find({ user: user.id,FieldOps:data.FieldOps,docType:data.docType }, { _id: false }, function (err,file) {
      if (file.length!=0) {
        Document.findOneAndUpdate({ user: user.id,FieldOps:data.FieldOps,docType:data.docType },{ name: data.name,
          user: user.id,
          file: data.file,
          fileType: data.type,
          FieldOps:data.FieldOps,
          docType:data.docType},
          function (err) {
            if(err){
              return  res.status(501).send({message:`couldn not update document`});
            }else{
              res.send({message:"File updated"});
            }
            
          })
       
      } else{
        //const bufferdata = new Buffer.from(data.data, "base64");
        data.type;
        const file = new Document({
          name: data.name,
          user: user.id,
          file: data.file,
          fileType: data.type,
          FieldOps:data.FieldOps,
          docType:data.docType
        });
        file.save(function (err, file) {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send({ message: "Some error occured while uploading" });
          } else {
            //console.log(file);
            res.status(201).json({
              message: `File ${data.name} uploaded!`,
            });
          }
        });
      }
    });
  } else {
    res.status(501).send({ message: "file contained no data" });
  }

  
};

/**
 * @function: deleteFile
 * @description: Delete a file users file from database
 * @access documents
 *
 * @param {*} req user information from body
 * @param {*} res with user information to client
 */
const deleteFile = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);
  const { name } = req.body;

  Document.findOneAndRemove({ user: user.id, name: name }, function (err) {
    if (err) {
      return res.status(400).json({
        message: "Failed to delete file",
      });
    }

    return res.status(201).json({
      message: "file deleted!",
    });
  });
};

const deleteFieldOPS = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);
 

  Document.deleteMany({user: user.id,FieldOps: req.query.FieldOps }, function (err) {
    if (err) {
      return res.status(400).json({
        message: "Failed to delete file",
      });
    }

    return res.send({ message: "Field OPS deleted!"});
  });
};

/**
 * @function: updateFile
 * @description: Update a file from the logged in user
 * @access documents
 *
 * @param {*} req user id from header token and file name
 * @param {*} res message
 */
const updateFile = (req, res) => {
    const token = req.headers.authorization;
    const user = jwt_decode(token.split(" ")[1]);


    if (req.body.file == null) return;
    const data = req.body.file;
    if (data.data != null && fileType.includes(data.type)) {
     
        Document.findOneAndUpdate({
          user: user.id,
          name: req.body.old_file_name
        }, {
          name: data.name,
          user: user.id,
          file: data.data,
          fileType: data.type,
        }, function (err, file) {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send({
                message: "file not updated"
              });
          } else {
            //console.log(file);
            res.status(201).json({
              message: "file updated",
            });
          }

        })
    }



};


module.exports = {
  uploadFile,
  deleteFile,
  viewFile,
  updateFile,
  fieldOPSDOCS,
  deleteFieldOPS
};
