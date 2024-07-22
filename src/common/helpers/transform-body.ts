function transformBody<RequestBody>(body: any): RequestBody {
  const data = (typeof body === 'string')
    ? JSON.parse(body)
    : body;

  return data;
}

export default transformBody;
