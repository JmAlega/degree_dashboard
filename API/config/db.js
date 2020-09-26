require('dotenv').config()

module.exports = {
  // url: `mongodb+srv://ads9dc:q24E70PTR9oM6bsJ@cluster0.0gtwv.mongodb.net/Subjects?retryWrites=true&w=majority`
  url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0gtwv.mongodb.net/Subjects?retryWrites=true&w=majority`
}