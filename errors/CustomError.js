class CustomError extends Error {
  constructor(code = 500, message, details = null) {
    super(message)
    this.code = code
    this.details = details
  }
}

module.exports = CustomError
