import { ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config"

const init = async() => {
    let page: number = 1;
    let input: ScanCommandInput = {
        TableName: "notes",
        Limit: 3,
    };
   const scanUntilDone = async(params: ScanCommandInput) => {
    
    const cmd = new ScanCommand(input);
    const scan = await DynoClient.send(cmd);

    if(scan.LastEvaluatedKey) {
        page += 1;
        input.ExclusiveStartKey = scan.LastEvaluatedKey;
        scanUntilDone(params);
    } else {
        console.log("Scanning is done");
        console.log(`Total page is: ${page}`)
    }
   }

   scanUntilDone(input);
    
};

init();