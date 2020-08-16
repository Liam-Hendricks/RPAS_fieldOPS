const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const app = express();
require("dotenv").config({ path: __dirname + "/config/config.env" });

app.use(
  bodyParser.urlencoded({
    extended: false,
    limit: "50mb",
  })
);
app.use(
  bodyParser.json({
    limit: "50mb",
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(helmet());
app.use(passport.initialize());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

require("./config/passport")(passport);

if (process.env.NODE_ENV == "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
//process.env.MONGODB_URI
//process.env.DATABASE
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("error", function () {
  console.log("Connection to Mongo established.");
  console.log("Could not connect to the database. Exiting now...");
  process.exit();
});
mongoose.connection.once("open", function () {
  console.log("Successfully connected to the database");
});

// Import Routes
const authorisedRoutes = require("./routes/authorised.routes");
const documentRoutes = require("./routes/document.routes");
const userRoutes = require("./routes/user.routes");
const eventRoutes=require('./routes/event.routes');
const adminRoutes=require('./routes/admin.routes');
// Use Routes middlewear
app.use("/api", authorisedRoutes);
app.use("/api", documentRoutes);
app.use("/api", userRoutes);
app.use("/api",eventRoutes);
app.use('/api',adminRoutes);


if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,'client/build')));
 
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
 
}

const port = process.env.PORT || 8080; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () =>
  console.log(`Server up and running on port localhost:${port} !`)
);
