import express from "express";
import { connectDB,disconnectDB,prisma } from "./config/db.js";
import { config } from "dotenv";

config()
connectDB()






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
