import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

await mongoose.connect("mongodb://localhost:27017/UsersDB");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("users", UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.post("/register", async (req, res) => {
  const user = req.body;
  const f = await Users.findOne({ username: user.username });
  if (!f) {
    const regis = new Users({
        name: user.name,
        username: user.username,
        password: user.password,
      });
      regis.save();
      res.render("success.ejs"); 
  } else {
    res.render("failure.ejs");
  }
});

app.listen(port, () => {
  console.log("Server running...");
});
