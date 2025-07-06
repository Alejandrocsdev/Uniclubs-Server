// Libraries
const {
  BaseError,
  AggregateError,
  AssociationError,
  BulkRecordError,
  AccessDeniedError,
  ConnectionAcquireTimeoutError,
  ConnectionRefusedError,
  ConnectionTimedOutError,
  HostNotFoundError,
  HostNotReachableError,
  InvalidConnectionError,
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
  UniqueConstraintError
} = require('sequelize')
// Errors
const CustomError = require('./CustomError')

const sqlError = error => {
  if (!(error instanceof BaseError)) return

  // === Validation Errors ===
  if (error instanceof UniqueConstraintError) {
    const { type, path: field, value } = error.errors?.[0]
    throw new CustomError(409, `${error.name}: ${error.message}`, { type, field, value })
  }

  // === Database Errors ===
  if (error instanceof ExclusionConstraintError) {
    throw new CustomError(409, 'Exclusion constraint error (sqlError: ExclusionConstraintError)')
  }
  if (error instanceof ForeignKeyConstraintError) {
    throw new CustomError(409, 'Foreign key constraint failed (sqlError: ForeignKeyConstraintError)', {
      table: error.table,
      fields: error.fields
    })
  }
  if (error instanceof TimeoutError) {
    throw new CustomError(503, 'Database operation timed out (sqlError: TimeoutError)')
  }
  if (error instanceof UnknownConstraintError) {
    throw new CustomError(500, 'Unknown constraint error (sqlError: UnknownConstraintError)')
  }

  // === Other Errors ===
  if (error instanceof AggregateError) {
    throw new CustomError(500, 'Aggregate error occurred (sqlError: AggregateError)')
  }
  if (error instanceof AssociationError) {
    throw new CustomError(500, 'Association error (sqlError: AssociationError)')
  }
  if (error instanceof BulkRecordError) {
    throw new CustomError(500, 'Bulk record error (sqlError: BulkRecordError)')
  }
  if (error instanceof EagerLoadingError) {
    throw new CustomError(500, 'Eager loading failed (sqlError: EagerLoadingError)')
  }
  if (error instanceof EmptyResultError) {
    throw new CustomError(404, 'No result found (sqlError: EmptyResultError)')
  }
  if (error instanceof InstanceError) {
    throw new CustomError(500, 'Instance validation error (sqlError: InstanceError)')
  }
  if (error instanceof OptimisticLockError) {
    throw new CustomError(409, 'Optimistic lock failed (sqlError: OptimisticLockError)', {
      modelName: error.modelName,
      values: error.values
    })
  }
  if (error instanceof QueryError) {
    throw new CustomError(400, 'Query error (sqlError: QueryError)')
  }
  if (error instanceof SequelizeScopeError) {
    throw new CustomError(400, 'Invalid scope error (sqlError: SequelizeScopeError)')
  }
  
  // === Connection Errors ===
  if (error instanceof AccessDeniedError) {
    throw new CustomError(500, 'Database access denied (sqlError: AccessDeniedError)')
  }
  if (error instanceof ConnectionAcquireTimeoutError) {
    throw new CustomError(503, 'Timed out acquiring a database connection (sqlError: ConnectionAcquireTimeoutError)')
  }
  if (error instanceof ConnectionRefusedError) {
    throw new CustomError(503, 'Database connection was refused (sqlError: ConnectionRefusedError)')
  }
  if (error instanceof ConnectionTimedOutError) {
    throw new CustomError(504, 'Database connection timed out (sqlError: ConnectionTimedOutError)')
  }
  if (error instanceof HostNotFoundError) {
    throw new CustomError(503, 'Database host not found (sqlError: HostNotFoundError)')
  }
  if (error instanceof HostNotReachableError) {
    throw new CustomError(503, 'Database host not reachable (sqlError: HostNotReachableError)')
  }
  if (error instanceof InvalidConnectionError) {
    throw new CustomError(500, 'Invalid database connection (sqlError: InvalidConnectionError)')
  }
}

module.exports = sqlError
