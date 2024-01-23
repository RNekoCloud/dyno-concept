import { DeleteItemCommand, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config";

const init = async() => {
    const input: DeleteItemCommandInput = {
        TableName: "notes",
        Key: {
            "noteid": {
                "S": "foo-xxx-01"
            }
        }
    };
    const cmd = new DeleteItemCommand(input);
    const response = await DynoClient.send(cmd);
    console.log(response);
};

init();