class CustomError extends Error {
  constructor(code, message, details) {
    super(message)
    this.code = code
    if (details) this.details = details
  }
}

module.exports = CustomError
