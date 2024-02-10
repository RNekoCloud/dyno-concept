import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynoHosted } from "../../constant/config";

const init = async() => {
    const cmd = new ScanCommand({
        TableName: "intern_dev",
        Limit: 6,
        ExclusiveStartKey: {
            "Id": {
                S: "lyE1KKIMnMAuRiVc68BAk"
            },
            "Points": {
                N: "0",
            }
        }
    })

    const res = await DynoHosted.send(cmd);
    const count = res.ScannedCount;
    console.log(`Scanned Count of items: ${count}`);
    console.log(`Count: ${res.Count}`)

}

init();