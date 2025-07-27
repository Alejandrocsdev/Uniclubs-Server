// Libraries
const {
  BaseError,
  AggregateError,
  AssociationError,
  BulkRecordError,
  ConnectionError,
  AccessDeniedError,
  ConnectionAcquireTimeoutError,
  ConnectionRefusedError,
  ConnectionTimedOutError,
  HostNotFoundError,
  HostNotReachableError,
  InvalidConnectionError,
  DatabaseError,
  ExclusionConstraintError,
  ForeignKeyConstraintError,
  TimeoutError,
  UnknownConstraintError,
  EagerLoadingError,
  EmptyResultError,
  InstanceError,
  OptimisticLockError,
  QueryError,
  SequelizeScopeError,
  ValidationError,
  UniqueConstraintError
} = require('sequelize')
// Errors
const CustomError = require('./CustomError')

const sqlError = error => {
  if (!(error instanceof BaseError)) return
  const { code: errCode } = error.parent

  // === Validation Errors ===
  if (error instanceof UniqueConstraintError) {
    if (errCode === 'ER_DUP_ENTRY') {
      const { path: field, value } = error.errors?.[0]
      throw new CustomError(409, `Duplicate value '${value}' for '${field}'.`, { errCode, field, value })
    }
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof ValidationError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }

  // === Database Errors ===
  if (error instanceof ExclusionConstraintError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof ForeignKeyConstraintError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof TimeoutError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof UnknownConstraintError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof DatabaseError) {
    if (errCode === 'WARN_DATA_TRUNCATED') {
      throw new CustomError(400, 'Invalid value for field type or ENUM.', { errCode })
    }
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }

  // === Connection Errors ===
  if (error instanceof AccessDeniedError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof ConnectionAcquireTimeoutError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof ConnectionRefusedError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof ConnectionTimedOutError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof HostNotFoundError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof HostNotReachableError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof InvalidConnectionError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof ConnectionError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }

  // === Other Errors ===
  if (error instanceof AggregateError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof AssociationError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof BulkRecordError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof EagerLoadingError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof EmptyResultError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof InstanceError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof OptimisticLockError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof QueryError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
  if (error instanceof SequelizeScopeError) {
    throw new CustomError(500, `${error.name}: ${error.message}`, { errCode })
  }
}

module.exports = sqlError
