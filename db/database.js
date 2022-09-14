const mongoose = require("mongoose");
const config = require("./../config.json");

mongoose.connect(
  `mongodb+srv://${config.username}:${config.password}@cluster0.7agcpr4.mongodb.net/${config.database}?retryWrites=true&w=majority`,
  {
    useMongoClient: true,
  }
);
let schema = EditorDocument;

if (process.env.NODE_ENV === "test") {
  console.log("TESTING MODE");
  schema = TestEditorDocument;

  console.log("schema!!", schema);
}
module.exports = {
  DB: db,
  connectdb: function connectDB() {
    mongoose.connect(db, (err) => {
      if (err) throw err;
      console.log("connected to MongoDB");
    });
    return mongoose.connection
      .once("open", () => console.log("Connected!"))
      .on("error", (error) => {
        console.warn("Error : ", error);
      });
  },
  closedb: function dbclose() {
    return mongoose.disconnect();
  },
  Schema: schema,
};
