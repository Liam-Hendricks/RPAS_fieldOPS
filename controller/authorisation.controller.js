const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

//import validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//function for handling registration
const register = (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //find if email exsist
  User.findOne({ email: req.body.email }).then((user) => {
    //if email found return error
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      //register user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};
//mongoose function for handling login
const login = (req, res) => {
  //do input validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          role:user.role
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: token,
              role: user.role,
              FieldOPs: user.FieldOPs,
              Events: user.Events,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
};
//function for verfiying auth token 
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, req) => {
      if (err) {
        return res.sendStatus(403);
      }

      req = req;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const facebookAuth = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  // Find user by email
  try {
    User.findOne({ email: email }, function (err, user) {
      // If User Found create JWT payload
      if (user) {
        const payload = {
          id: user.id,
          name: user.name,
          role:user.role,
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            return res.json({
              //send jwt token containing user info
              success: true,
              token: token,
              role: user.role,
              FieldOPs: user.FieldOPs,
              Events: user.Events,
            });
          }
        );
      } else {
        //if user is not added yet
        try {
          const newUser = new User({
            //create new user
            name: name,
            email: email,
            password: password,
          });
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              newUser.password = hash;
              newUser.save(function (err) {
                if (err) {
                  res.send({ err });
                } else {
                  User.findOne({ email: email }, function (err, user) {
                    if (err) {
                      res.json(err);
                    }

                    if (user) {
                      const payload = {
                        id: user.id,
                        name: user.name,
                        role:user.role
                      };
                      // Sign token
                      jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        {
                          expiresIn: 31556926, // 1 year in seconds
                        },
                        (err, token) => {
                          return res.json({
                            success: true,
                            token: token,
                            role: user.role,
                            FieldOPs: user.FieldOPs,
                            Events: user.Events,
                          });
                        }
                      );
                    }
                  });
                }
              });
            });
          });

          //we have to find the user after creating them to get their user id
        } catch (e) {
          res.send(e);
        }
      }
    });
  } catch (e) {
    res.send(e);
  }
};


module.exports = {
  register,
  login,
  authenticateJWT,
  facebookAuth,
};
