const timestampFields = ['createdAt', 'updatedAt']

const excludeFields = (ts, fields = []) => {
  try {
    return ts !== 'true' ? [...fields, ...timestampFields] : fields
  } catch (error) {
    throw new CustomError(500, 'Field exclusion failed (util: sql)')
  }
}

const deleteFields = (rawData, fields = []) => {
  try {
    const data = rawData.toJSON()
    const deletionSet = new Set([...fields, ...timestampFields])
    for (const key of deletionSet) {
      delete data[key]
    }
    return data
  } catch (error) {
    throw new CustomError(500, 'Field deletion failed (util: sql)')
  }
}

module.exports = { excludeFields, deleteFields }
