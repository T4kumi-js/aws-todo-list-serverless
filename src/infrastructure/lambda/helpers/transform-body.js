function transformBody(body) {
  const data = (typeof body === 'string')
    ? JSON.parse(body)
    : body;

  return data;
}

module.exports = transformBody;
