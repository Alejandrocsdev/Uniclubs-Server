const omitFields = (ts, fields = []) => {
  try {
    if (ts !== 'true') fields.push('createdAt', 'updatedAt')
    return fields
  } catch (error) {
    throw new CustomError(500, 'Field omission failed (util: sql)')
  }
}

module.exports = omitFields
