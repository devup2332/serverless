import { APIGatewayProxyHandler } from "aws-lambda";
import AWS from "aws-sdk";

export const getTasks: APIGatewayProxyHandler = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const result = await dynamoDB
    .scan({
      TableName: "TaskTable",
    })
    .promise();

  const tasks = result.Items;

  return {
    statusCode: 200,
    body: JSON.stringify({
      tasks,
    }),
  };
};
