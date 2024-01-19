import { AttributeAction, CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
    endpoint: "http://localhost:8000",
    
});

const init = async() => {
    const command = new CreateTableCommand({
        TableName: "todo_dev",
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "id",
                KeyType:  "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        }
    })

    const response = await client.send(command)
    console.log(response)
}

init()