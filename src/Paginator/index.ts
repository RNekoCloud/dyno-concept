import { paginateScan } from "@aws-sdk/client-dynamodb";
import { DynoClient } from "../../constant/config"

const init = async() => {
   const paginator = paginateScan({
    pageSize: 3,
    client: DynoClient,
    startingToken: "foo-xxx-03"
   }, 
   {
    TableName: "notes",
   });

   const page = await paginator.next();
   const items = page.value?.Items;
   console.log(items)
};

init();