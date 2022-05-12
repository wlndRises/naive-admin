// camelCase or CamelCase => camel-case
export const toLine = value => {
  return value.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

// camel-case => camelCase
export const toHump = value => {
  return value.replace(/-(\w)/g, (all, letter) => {
    // all => -Case letter => Case
    return letter.toUpperCase()
  })
}

// firstUpper => FirstUpper
export const capitalize = value => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
