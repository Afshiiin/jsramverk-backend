const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { database } = require('./db/database.js'); // Assuming this is a CommonJS module

// Import routes
const index = require('./routes/index.js');
const hello = require('./routes/hello.js');
const post = require('./routes/post.js');
const get = require('./routes/get.js');
const put = require('./routes/put.js');
const deleteRoute = require('./routes/delete.js');

const app = express();
const port = process.env.PORT || 1337;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Add routes to the app
app.use(index);
app.use(hello);
app.use(post);
app.use(get);
app.use(put);
app.use(deleteRoute);

// Middleware for 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error-handling middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    errors: [
      {
        status: err.status || 500,
        title: err.message,
        detail: err.message,
      },
    ],
  });
});

// Connect to the database and start the server
database.connectDB()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

  
const server = app.listen(port, () => console.log(`Example API listning on port ${port}!`));
module.exports = server
