const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
dotenv.config();

const sequelize = require("./util/database");
const userRoutes = require("./routes/userRoute");
const otpRoutes = require("./routes/otpRoute");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(userRoutes);
app.use("/otp", otpRoutes);
app.use("/user", userRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

sequelize
  .sync()
  .then((res) => {
    app.listen(process.env.PORT_NUMBER || 3000);
    console.log("App listening on port 3000");
  })
  .catch((err) => {
    console.log(err);
  });
