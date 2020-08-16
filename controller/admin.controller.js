const bcrypt = require("bcryptjs");
const jwt_decode = require("jwt-decode");
const User = require("../models/user.model.js");

/**
 * @function: GetUserAccounts
 * @description: Get all users profiles that have role user
 * @access User
 *
 * @param {*} req admin information from body
 * @param {*} res with user information to client
 */

const GetUserAccounts = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);

  User.findById(user.id, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: `could not find user`,
      });
    }
    if (user !== null) {
      if (user.role === "admin") {
        User.find({ role: "user" }, function (err, data) {
          if (err) {
            return res.status(501).send({ message: `could not find users` });
          } else {
            return res.send(data);
          }
        });
      } else {
        return res.status(400).json({
          message: `Not Authorised`,
        });
      }
    } else {
      return res.status(400).json({
        message: `user not found`,
      });
    }
  });
};

/**
 * @function: ADMIN_UPDATE_ACCOUNT
 * @description: admin can update a users information
 * @access User
 *
 * @param {*} req admin information from body
 * @param {*} res with user information to client
 */

const ADMIN_UPDATE_ACCOUNT = (req, res) => {
  const token = req.headers.authorization;
  const user = jwt_decode(token.split(" ")[1]);
  const { name, email, password, id, role } = req.body;
  User.findById(user.id, function (err, user) {
    if (err) {
      return res.status(400).json({
        message: `could not find user`,
      });
    }
    if (user !== null) {
      if (user.role === "admin") {
        if (password === "") {
          User.findByIdAndUpdate(
            id,
            { role: role, name: name, email: email },
            function (err, data) {
              if (err) {
                return res
                  .status(501)
                  .send({ message: `Could Not update user` });
              } else {
                return res.send({ message: `User Updated` });
              }
            }
          );
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              if (err) throw err;
              const newPassword = hash;
              User.findByIdAndUpdate(
                id,
                { role: role, name: name, email: email, password: newPassword },
                function (err, data) {
                  if (err) {
                    return res
                      .status(501)
                      .send({ message: `Could Not update user` });
                  } else {
                    return res.send({ message: `User Updated` });
                  }
                }
              );
            });
          });
        }
      } else {
        return res.status(400).json({
          message: `Not Authorised to update`,
        });
      }
    } else {
      return res.status(400).json({
        message: `user not found`,
      });
    }
  });
};
module.exports = {
  GetUserAccounts,
  ADMIN_UPDATE_ACCOUNT,
};
