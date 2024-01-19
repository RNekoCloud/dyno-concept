interface DynoParams  {
    TableName: string,
    Key: {
        ID: { 
            N: string,
        },
    },
    ProjectionExpression: string,
};

export default DynoParams;