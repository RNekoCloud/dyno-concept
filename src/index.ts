import AWS from "aws-sdk";

// Load up shared configuration AWS in local machine
const credentials = new AWS.SharedIniFileCredentials()
AWS.config.credentials = credentials

// Set region into config
AWS.config.update({region: "us-east-1"})

console.log("Hello from AWS SDK...")