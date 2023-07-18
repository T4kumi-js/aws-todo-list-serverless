function jsonResponse(body, statusCode = 200) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': process.env.ALLOWED_STATIC_SITE,
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

module.exports = {
  jsonResponse
};
