const getNumberOfColumns = (headers, format) => {
  return headers && headers.length / format;
}

const getDivisionItem = (headers, format) => {
  return Array.from({ length: format + 1 },
    (v, i) => i * getNumberOfColumns(headers, format) - 1).slice(1)
}

export {
  getDivisionItem,
  getNumberOfColumns
}