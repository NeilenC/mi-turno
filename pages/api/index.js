// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const express = require("express")
// require("dotenv").config()
// const BodyParser = require("body-parser");
// const { connectDB } = require("./config/db")
// const { port } =require("./config/index")
// const routes = require("./routes")
// const cors = require("cors")

// const app = express()
// app.use(cors())

// app.use("/", routes)
// app.use(BodyParser.json())

// app.listen(port)
// console.log("servidor en puerto0000000", port)

// connectDB()

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
