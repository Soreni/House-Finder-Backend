module.exports = {
  //Token Id
  JWT_KEY: process.env.JWT_KEY || "housefinder_jwtprivatekey",
  // MongoDB URL
  // MongoURI: process.env.MongoURI || "mongodb://127.0.0.1:27017/housefinderDb",

  MongoURI:
    process.env.MongoURI ||
    "mongodb+srv://admin1:HVvufM08srDrj2c9@cluster0.wwxxv.mongodb.net/housefinderDb?retryWrites=true&w=majority",

  // HTTP PORT
  PORT: process.env.HTTP_PORT || 8081,
};
