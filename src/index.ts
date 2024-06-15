import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
