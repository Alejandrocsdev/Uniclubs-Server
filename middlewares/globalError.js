function globalError(err, req, res, next) {
  console.log(err)

  res.status(err.code || 500).json({ message: err.message })
}

module.exports = globalError
