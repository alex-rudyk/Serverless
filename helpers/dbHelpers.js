
/**
 * Create Set UpdateParameters for dynamoDB.
 * 
 * @param {string} table table name.
 * @param {object} keys search keys.
 * @param {object} attr attributes to update.
 * @returns {AWS.DynamoDB.DocumentClient.UpdateItemInput} params
 * 
 * @example
 *  
 *  // Create params for updating user name to `Alex` in the table `MY_TABLE_NAME` where userId is equal `123`.
 *  const params = createSetUpdateParams('MY_TABLE_NAME', { userId: 123 }, { name: 'Alex' });
 *  console.log(params); 
 *  
 * output: 
 * 
 *  {
 *      TableName: 'MY_TABLE_NAME',
 *      Key: {
 *          userId: 123
 *      },
 *      UpdateExpression: 'set #name = :name',
 *      ExpressionAttributeNames: {
 *          '#name': 'name'
 *      },
 *      ExpressionAttributeValues: {
 *          ':name': 'Alex'
 *      }
 *  }
 */
module.exports.createSetUpdateParams = (table, keys, attr) => {
    const params = {
        TableName: table,
        Key: {
            ...keys
        }
    };

    params.UpdateExpression = 'set';
    params.ExpressionAttributeNames = {};
    params.ExpressionAttributeValues = {};

    for (const property in attr) {
        if (!attr[property])
            continue;

        params.UpdateExpression += ` #${property} = :${property} ,`;
        params.ExpressionAttributeNames['#' + property] = property;
        params.ExpressionAttributeValues[':' + property] = attr[property];
    }

    params.UpdateExpression = params.UpdateExpression.slice(0, -1);

    return params;
}