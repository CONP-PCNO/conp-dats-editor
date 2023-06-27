function parseValue(value, selfString) {
  return typeof value === 'string' ? value : value[selfString]
}

function parseValues(values, selfString) {
  const name = parseValue(values.name, selfString)
  const description = parseValue(values.description, selfString)

  const out = { name, description }
  if (Object.hasOwn(values, 'fieldName')) {
    out.fieldName = values.fieldName
  }
  return out
}

export default parseValues
