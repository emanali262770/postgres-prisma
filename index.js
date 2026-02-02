import "dotenv/config";

import express from "express";
import { connectDB, disconnectDB } from "./config/db.js";
import authRoute from "./Routes/authRoute.js";

await connectDB();

const app = express();
app.use(express.json());
app.use("/auth", authRoute);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



//Handle Stituation
process.on("unhandledRejection", (err) => {
  console.error(err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error(err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
