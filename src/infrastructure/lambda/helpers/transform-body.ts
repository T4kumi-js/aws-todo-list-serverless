function transformBody(body: any): any {
  const data = (typeof body === 'string')
    ? JSON.parse(body)
    : body;

  return data;
}

export default transformBody;
