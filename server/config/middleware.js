var bodyParser = require('body-parser'); // parse request body of POST requests
var morgan = require('morgan'); // log requests
var helpers = require('./helpers.js'); // error logging and handling utility functions

module.exports = function(app, express) {

  var placeRouter = express.Router();

  // log all requests using the dev format
  app.use(morgan('dev'));

  // parse JSON request bodies for POST requests
  app.use(bodyParser.json());

  // use the placeRouter for all place requests
  app.use('/api/places', placeRouter);

  app.use(helpers.logErrors);
  app.use(helpers.handleErrors);

  // inject placeRouter into its respective route file
  require('../places/placeRoutes.js')(placeRouter);
};
