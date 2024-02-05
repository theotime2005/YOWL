const dotenv = require("dotenv");
dotenv.config()
const cors = require('cors');
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const helmet = require("helmet");
const morgan = require("morgan");

const auth_token = require('./midlewhere/authentication');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");


app.use(cors())
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// log the method on the console
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use("/api/auth", authRoute);
app.use("/api/users", auth_token, userRoute);
app.use("/api/posts", auth_token, postRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connection successful"))
  .catch((err) => {
    console.log(err);
  });


app.listen(8800,()=>{
    console.log("Backend server is running on localhost: 8800")
})