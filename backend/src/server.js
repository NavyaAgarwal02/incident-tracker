import express from "express";
import cors from "cors";
import incidentRoutes from "./routes/incidents.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/incidents", incidentRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
