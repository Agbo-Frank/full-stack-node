import express from 'express'
import helmet from 'helmet';
import cors from 'cors';
import ErrorHandler from './middleware/error-handler';
import api from './api';
import path from 'path';
import cookieParser from 'cookie-parser';
import Logger from './utility/logger';
import checkUser from './middleware/check-user';
import initiateJobs from './cron';

const logger = new Logger("server")

// initiateJobs()
const app = express();

// app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
	origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use("/assets", express.static(path.join('public')));
app.set('views', path.join('views'));
app.set('view engine', 'ejs');
// app.locals.cache = true;

app.use((req, res, next) => {
  logger.log("info", {method: req?.method, endpoint: req?.url})
  res.setHeader("Content-Security-Policy", "img-src * data:;");
  // res.setHeader('Cache-Control', 'public, max-age=86400');
  next()
})

app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(checkUser)
api(app)
app.use(ErrorHandler)

app.disable('x-powered-by')
export default app