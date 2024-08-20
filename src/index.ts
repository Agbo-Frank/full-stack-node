import { MONGODB_URL, PORT } from "./utility/config"
import app from "./app"
import mongoose from "mongoose"
import Logger from "./utility/logger"

const logger = new Logger("server")

mongoose.connect(MONGODB_URL as string, {autoIndex: false})
  .then(() => {
    console.log("MongoDB connected successfully...");
    app.listen(PORT, () => logger.log(`Application runing on port ${PORT}...`))
  })
  .catch((err) => console.log("MongoDB Error just occured " + err))