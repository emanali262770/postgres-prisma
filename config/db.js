import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development"
    ? ["query", "error", "warn"]
    : ["error"],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database Connected");
  } catch (error) {
    console.log("DB connection Error", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("Database Disconnected");
  } catch (error) {
    console.log("DB disconnection Error", error);
  }
};

export { connectDB, disconnectDB, prisma };
