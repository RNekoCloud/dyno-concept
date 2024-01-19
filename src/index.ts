import AWS from "aws-sdk";
import DynoParams from "./types/dyno_param";

// Load up shared configuration AWS in local machine
const credentials = new AWS.SharedIniFileCredentials();
AWS.config.credentials = credentials;

// Set region into config
AWS.config.update({region: "us-east-1"});
console.log("Hello from AWS SDK...");

// Setup DynamoDB
const dyno = new AWS.DynamoDB({ apiVersion: "2012-08-10"})

// Getting data by params
const params: DynoParams = {
    TableName: "todo_app",
    Key: {
        ID: {
            N: "1"
        },
    },
    ProjectionExpression: "",
}