import express from "express";
import { errorMiddleware } from "./middlewares/error_handler.middleware.js";
import { notFoundMiddleware } from "./middlewares/not_found.middleware.js";
import userRouter from "./features/user/user.route.js";
import { clerkMiddleware } from "@clerk/express";
import { profileRouter } from "./features/profile/profile.route.js";
const app = express();

// Parse JSON request bodies
app.use(express.json());

// Health check route
app.get("/health", (_req, res) => {
  return res.status(200).json({
    message: "TrainX Backend is running",
  });
});

app.use(clerkMiddleware());

////
app.use("/user", userRouter);
app.use("/profile", profileRouter);
// throw if no route
app.use(notFoundMiddleware);
// Error handler MUST be last
app.use(errorMiddleware);

export default app;
