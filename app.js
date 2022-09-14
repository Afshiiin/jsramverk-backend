const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const config = require("./db/config.json");

mongoose.connect(
  `mongodb+srv://${config.username}:${config.password}@cluster0.cd3mi9q.mongodb.net/${config.database}?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  }
);

const app = express();
const port = process.env.PORT || 1337;
const index = require("./routes/index");
const hello = require("./routes/hello");
const post = require("./routes/post");
const get = require("./routes/get");
const put = require("./routes/put");
const deletee = require("./routes/delete");

app.use(cors());
app.use(express.json());

// don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
  // use morgan to log at command line
  app.use(morgan("combined")); // 'combined' outputs the Apache style LOGs
}

// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last

// Add a route

app.use(index);
app.use(hello);
app.use(post);
app.use(get);
app.use(put);
app.use(deletee);

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    errors: [
      {
        status: err.status,
        title: err.message,
        detail: err.message,
      },
    ],
  });
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));
