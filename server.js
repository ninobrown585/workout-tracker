const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
//const htmlROutes = require(./routes/html)
const PORT = process.env.PORT || 3000;

//const User = require("./userModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(htmlROutes)(app)
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true
});

app.use(require("./routes/htmlRoutes"));
app.use(require("./routes/apiRoutes"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});