import { APIGatewayProxyHandler } from "aws-lambda";

export const hello: APIGatewayProxyHandler = async (event) => {
  const { name } = event.pathParameters;
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hola ddd 123 dddd ${name}`,
    }),
  };
};
