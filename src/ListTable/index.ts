import { ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config";

const init = async() => {
    const cmd = new ListTablesCommand({})
    const response = await DynoClient.send(cmd)
    console.log(response.TableNames)
}

init()