const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('mi port 8080');
});
