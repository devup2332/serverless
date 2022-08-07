import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 } from "uuid";
import AWS from "aws-sdk";

export const addTask: APIGatewayProxyHandler = async (event) => {
  try {
    const { title, description } = JSON.parse(event.body);
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const createadAt = new Date().toISOString();
    const id = v4();
    const newTask = {
      id,
      title,
      description,
      createadAt,
    };

    await dynamodb
      .put({
        TableName: "TaskTable",
        Item: newTask,
      })
      .promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Task created successfully",
        task: newTask,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: err,
      }),
    };
  }
};
