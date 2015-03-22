module.exports = {

  logErrors: function(err, req, res, next) {
    console.error(err.stack);
    next(err);
  },

  handleErrors: function(err, req, res, next) {
    res.status(500).send({error: err.message});
  }
};
