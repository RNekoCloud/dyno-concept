import {  CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config";

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

    const response = await DynoClient.send(command)
    console.log(response)
}

init()