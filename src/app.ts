import express from 'express'
import helmet from 'helmet';
import cors from 'cors';
import ErrorHandler from './middleware/error-handler';
import api from './api';
import path from 'path';
import cookieParser from 'cookie-parser';
import Logger from './utility/logger';
import checkUser from './middleware/check-user';

const logger = new Logger("server")

const app = express();

app.use((req, _, next) => {
  logger.log("info", {method: req?.method, endpoint: req?.url})
  next()
})

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
	origin: '*',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(checkUser)
api(app)
app.use(ErrorHandler)

app.disable('x-powered-by')
export default app