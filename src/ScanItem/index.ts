import { AttributeValue, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config";

const init = async() => {
    const input: ScanCommandInput = {
        TableName: "notes",
        Limit: 3,
    }

    const cmd = new ScanCommand(input);
    const response = await DynoClient.send(cmd)

    const lastkey = response.LastEvaluatedKey?.noteid.S

    console.log(response.Items)
    console.log(`Last Evaluated Key: ${lastkey}`)

};

init();