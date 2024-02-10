import { ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { DynoHosted } from "../../constant/config"

const init = async() => {
    // Page you want to retrieve
    const pageQuery: number = 1;

    // Initial State 
    const pageState = [
        {
            page: 1,
            lastEvaluatedKey: {},
        }
    ]

    // Final State
    const finalState = {
        page: 0,
        lastEvaluatedKey: {}
    }

    // Counter of total page
    let pageCounter: number = 1;
    let input: ScanCommandInput = {
        TableName: "intern_dev",
        Limit: 6,
    };
   const scanUntilDone = async(params: ScanCommandInput) => {
    
    const cmd = new ScanCommand(input);
    const scan = await DynoHosted.send(cmd);

    if(scan.LastEvaluatedKey) {
        pageCounter ++;
        pageState.push({
            page: pageCounter,
            lastEvaluatedKey: scan.LastEvaluatedKey
        })
        input.ExclusiveStartKey = scan.LastEvaluatedKey;
        scanUntilDone(params);
    } else {
        pageCounter -= 1;
        pageState.forEach(el => {
            if(el.page == pageQuery) {
                finalState.lastEvaluatedKey = el.lastEvaluatedKey;
                finalState.page = el.page;
            }
        })

        console.log("Scanning is done");
        console.log(`Total page is: ${pageCounter}`)
    }
   }

   await scanUntilDone(input);

   const paginationInput: ScanCommandInput = {
        TableName: "intern_dev",
        Limit: 6,
   }

   if(finalState.page > 1) {
    paginationInput.ExclusiveStartKey = finalState.lastEvaluatedKey;
   }

   const cmdPagination = new ScanCommand(paginationInput)
   const sendPagination = await DynoHosted.send(cmdPagination)

   console.log("Result:")
   sendPagination.Items?.forEach(el => {
    console.log(el)
   })
    
};

init();