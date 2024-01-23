import { GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config";

const init = async() => {
    const input: GetItemCommandInput = {
        Key: {
            "noteid": {
                S: "foo-xxx-01",
            },
        },
        TableName: "notes"
    }
    const cmd = new GetItemCommand(input);
    const response = await DynoClient.send(cmd);
    console.log(response.Item?.title)
};

init();
