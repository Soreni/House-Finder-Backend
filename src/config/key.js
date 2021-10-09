module.exports = {
   // MongoDB URL
   MongoURI: process.env.MongoURI || "mongodb://127.0.0.1:27017/housefinderDb",
    // HTTP PORT
    PORT: process.env.HTTP_PORT || 5000
}