import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const DynoClient = new DynamoDBClient({
    // Use DynamoDB local
    endpoint: "http://localhost:8000",
});