import { ScanCommand, ScanCommandInput, AttributeValue } from "@aws-sdk/client-dynamodb";
import { DynoHosted } from "../../constant/config"

interface State {
    page: number,
    evalKey: Record<string, AttributeValue>
}

const countPage = async() => {
  const cmd = new ScanCommand({
    TableName: "intern_dev"
  })

  const res = await DynoHosted.send(cmd)

  let totalResult: number = 0;

  if(res.Count) {
    const total = Math.ceil(res.Count / 6) 
  
    totalResult = total
  }

  return totalResult
  
}

const init = async() => {
    // Page you want to retrieve
    const pageQuery: number = 1;

    // Initial State 
    const pageState: State[] = [
        {
            page: 1,
            evalKey: {},
        }
    ]

    // Final State
    const finalState = {
        page: 0,
        lastEvaluatedKey: {}
    }

    const totalPageWithFormula = await countPage();

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
            evalKey: scan.LastEvaluatedKey
        })
        input.ExclusiveStartKey = scan.LastEvaluatedKey;
        scanUntilDone(params);
    } else {
        const lastIndex = pageState.length - 1;

        pageState.forEach(el => {
            if(el.page == pageQuery) {
                finalState.lastEvaluatedKey = el.evalKey;
                finalState.page = el.page;
            }
        })

        const keyEval = pageState[lastIndex].evalKey;
        const idKeyEval = keyEval.Id.S

        console.log(`Evaluated Key in last page: ${idKeyEval}`)
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

//    console.log("Result:")
//    sendPagination.Items?.forEach(el => {
//     console.log(el)
//    })
   //
   console.log(`Total with formula:`, totalPageWithFormula)
    
};

init();
