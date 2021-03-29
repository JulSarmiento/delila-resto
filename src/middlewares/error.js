module.exports = (err, req, res, next) => {
  console.error(err, req, res, next);

  res
    .status(500)
    .json({message: 'Internal server error', err})
}
