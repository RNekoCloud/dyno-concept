import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config";

const init = async() => {
    const input: PutItemCommandInput = {
        TableName: "notes",
        Item: {
            "noteid": {
                S: "foo-xxx-01",
            },
            "title": {
                S: "My Shopping List",
            },
            "body": {
                S: "Lorem of my note",
            },
        },
        ReturnConsumedCapacity: "TOTAL"
    };

    const cmd = new PutItemCommand(input)
    const response = await DynoClient.send(cmd)
    console.log(response)
};

init();