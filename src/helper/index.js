function extractCommand(message) {
  const regex = /^\/(\w+)/i
  const res = regex.exec(message)
  if(!res) return false

  return res[1]
}

module.exports = {
  extractCommand: extractCommand
}
