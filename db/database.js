const mongoose = require('mongoose');
const config = require('./config.json'); // Use require for JSON imports

mongoose.set('strictQuery', true);

// Connect to MongoDB
const mongoURI = process.env.NODE_ENV === 'test'
  ? `mongodb://localhost:27017/test`
  : `mongodb+srv://${config.username}:${config.password}@cluster0.qr9kg.mongodb.net/${config.database}?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.warn('Error : ', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const database = {
  connectDB: function connectDB() {
    if (db.readyState === 1) {
      console.log('Already connected to MongoDB');
      return Promise.resolve(db);
    }

    return mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('Connected to MongoDB');
    }).catch((err) => {
      console.error('Connection error:', err);
    });
  },
  closedb: function dbclose() {
    if (db.readyState === 0) {
      console.log('Already disconnected from MongoDB');
      return Promise.resolve();
    }

    return mongoose.disconnect().then(() => {
      console.log('Disconnected from MongoDB');
    });
  },
};

module.exports = { database };
