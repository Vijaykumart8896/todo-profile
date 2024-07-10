const { connect, set } = require("mongoose");
const { MONGODB_URL } = require("../config/index");

const DbConnection = () => {
  connect(MONGODB_URL)
    .then(() => console.log("Successfully Connected MongoDB database"))
    .catch((err) => {
      console.error("Failed to connet the MongoDB database");
      console.error(err);
    });
};

module.exports = DbConnection;
