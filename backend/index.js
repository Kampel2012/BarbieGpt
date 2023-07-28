import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { errors } from "celebrate";
import routes from "./routes/index.js";
import { NotFoundError } from "./errors/index.js";
import handleError from "./middlewares/error.js";
// import { requestLogger, errorLogger } from './middlewares/logger.js';
import { fileURLToPath } from "url";
import path from "path";

const { PORT = 3000, DB_URL = "mongodb://127.0.0.1/chattyaidb" } = process.env;

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticFolderPath = path.join(__dirname, "dist");

mongoose.connect(DB_URL, { useNewUrlParser: true });

app.use(express.static(staticFolderPath));

app.use(helmet());

app.use(limiter);

app.use(express.json());

// app.use(requestLogger);

/* const allowedCors = ["http://127.0.0.1:5173", "http://localhost:5173"];

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

  const requestHeaders = req.headers["access-control-request-headers"];

  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);

    return res.end();
  }

  return next();
}); */

app.use(cors({ origin: true, credentials: true }));

app.use(routes);

app.use("*", () => {
  throw new NotFoundError("Данная страница не найдена");
});

// app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(PORT);
