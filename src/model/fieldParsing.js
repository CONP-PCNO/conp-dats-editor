function parseValue(value, selfString) {
  return typeof value === 'string' ? value : value[selfString]
}

function parseObject(object, selfString) {
  return typeof Object.values(object)[0] === 'string'
    ? object
    : object[selfString]
}

function parseValues(values, selfString) {
  const name = parseValue(values.name, selfString)
  const description = parseValue(values.description, selfString)

  const out = { name, description }
  if (Object.hasOwn(values, 'fieldName')) {
    out.fieldName = values.fieldName
  }
  if (Object.hasOwn(values, 'items')) {
    out.items = parseObject(values.items, selfString)
  }
  return out
}

export default parseValues
