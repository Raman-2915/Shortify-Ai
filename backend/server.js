const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(

  cors({

    origin:
      "https://shortify-iv3prabbi-ramandeep-singh-s-projects.vercel.app",

    credentials: true,

  })

);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/url", require("./routes/urlRoutes"));
app.use("/api/ai",require("./routes/aiRoutes"));

// Redirect Route (IMPORTANT)
app.get("/:shortId", require("./controllers/urlController").redirectUrl);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);