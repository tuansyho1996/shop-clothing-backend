import compression from 'compression';
import express from 'express'
import helmet from 'helmet';
import morgan from 'morgan';
import { checkOverload } from './helpers/check.connect.js';
import routes from './routes/index.js'
import connectDB from './dbs/init.mongodb.js';

// import cookieParser from 'cookie-parser';

const app = express();

// app.use(cookieParser())

// init middleware
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://0.0.0.0:3000', 'http://192.168.1.177:3000'];
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH,OPTIONS');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization,X-Client-Id');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);


  // Pass to next layer of middleware
  next();
});

app.use(morgan('combined'))

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))


// init db
connectDB()
// import { v4 as uuidv4 } from 'uuid';
// import mylogger from './logger/mylogger.logger.js';



// init router
app.use('/', routes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: 'error',
    stack: error.stack,
    code: statusCode,
    message: error.message || 'Internal Server Error'
  })
})

// handling error

export default app