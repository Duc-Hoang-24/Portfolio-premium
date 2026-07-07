import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import projectRoutes from "./server/routes/project.route.js";
import contactRoutes from "./server/routes/contact.routes.js";
import qualificationRoutes from "./server/routes/qualification.route.js";
import userRoutes from "./server/routes/user.routes.js";
import authRoutes from "./server/routes/auth.routes.js";

mongoose.Promise = global.Promise;
mongoose
  .connect(config.mongoUri, {})
  .then(() => {
    console.log("Connected to the database!");
  });
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});

// mount all your routes
app.use(projectRoutes);
app.use(contactRoutes);
app.use(qualificationRoutes);
app.use(userRoutes);
app.use(authRoutes);

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});