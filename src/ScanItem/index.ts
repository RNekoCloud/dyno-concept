import { ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config";

const init = async() => {
    const input: ScanCommandInput = {
        TableName: "notes",
        Limit: 3
    }

    const cmd = new ScanCommand(input);
    const response = await DynoClient.send(cmd)
    console.log(response.Items)
    console.log(`Last Evaluated Key: ${response.LastEvaluatedKey?.noteid.S}`)

};

init();