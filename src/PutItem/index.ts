import { PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config";
import { nanoid } from "nanoid"

const init = async() => {
    const input: PutItemCommandInput = {
        TableName: "notes",
        Item: {
            "noteid": {
                S: nanoid(),
            },
            "title": {
                S: "Bar's appointment",
            },
            "body": {
                S: "Lorem of my Bar Appointment",
            },
        },
        ReturnConsumedCapacity: "TOTAL",
    };

    const cmd = new PutItemCommand(input)
    const response = await DynoClient.send(cmd)
    console.log(response)
};

init();
