const rateLimit = require('express-rate-limit');
const secure = require('express-secure-only');
const compression = require('compression');
const express = require('express');
const nocache = require('nocache');
const helmet = require('helmet');
const http = require('http');
// const path = require('path');
const cors = require('cors');

const app = express();

app.enable('strict routing');
app.enable('trust proxy');

if (process.env.NODE_ENV === 'production') {
  app.use(secure());
}

app.use(cors());
app.use(helmet({ frameguard: false, contentSecurityPolicy: false }));
app.use(compression());
app.use(nocache());
app.use(
  rateLimit({
    windowMs: 60000, // How long in milliseconds to keep records of requests in memory.
    max: 0, // Max number of connections during windowMs milliseconds before sending a 429 response. Set to 0 to disable.
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', (req, res) => {
  return res.status(200).json({ status: 'Works' });
});

http.createServer(app).listen(process.env.PORT || 3000, () => {
  console.log('Works!');
});
