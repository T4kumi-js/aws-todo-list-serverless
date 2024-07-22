import { APIGatewayProxyResultV2 } from 'aws-lambda';

function jsonResponse<ResponseBody>(
  body: ResponseBody,
  statusCode: number = 200
): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': process.env.ALLOWED_STATIC_SITE!,
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}

export {
  jsonResponse
};
