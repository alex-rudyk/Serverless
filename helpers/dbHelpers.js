
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