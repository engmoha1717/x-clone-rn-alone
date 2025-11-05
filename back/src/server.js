import { ENV } from "./config/env.js";

import express from "express";

const app = express();


app.listen(process.env.PORT, () => console.log("Server is up and running on PORT:", ENV.PORT));