const { dynamoDbClient } = require(".");
const { createSetUpdateParams } = require("../helpers/dbHelpers");
const { BOOKS_TABLE } = process.env;

/**
 * Get all books from library.
 * @returns {Promise<PromiseResult<AWS.DynamoDB.DocumentClient.ScanOutput, AWS.AWSError>>} results
 */
module.exports.getAll = async () => {
    const params = {
        TableName: BOOKS_TABLE
    }

    return dynamoDbClient.scan(params).promise();
}

/**
 * Get book at UUID from library.
 * @param {string} bookUuid book UUID.
 * @returns {Promise<PromiseResult<AWS.DynamoDB.DocumentClient.GetItemOutput, AWS.AWSError>>} results
 */
module.exports.get = async (bookUuid) => {
    const params = {
        TableName: BOOKS_TABLE,
        Key: {
            bookUuid
        }
    }

    return dynamoDbClient.get(params).promise();
}

/**
 * Create new book with data
 * @param {object} data book data.
 * @returns {Promise<PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>>} results
 */
module.exports.create = async (data) => {
    const params = {
        TableName: BOOKS_TABLE,
        Item: {
            ...data
        },
    };

    return dynamoDbClient.put(params).promise();
}

/**
 * Update book with new data.
 * @param {object} data book data to update.
 * @returns {Promise<PromiseResult<AWS.DynamoDB.DocumentClient.UpdateItemOutput, AWS.AWSError>>} result
 */
module.exports.update = async (data) => {
    const { bookUuid, ...bookData } = data;

    const params = {
        ...createSetUpdateParams(BOOKS_TABLE, { bookUuid }, bookData),
        ReturnValues: 'ALL_NEW'
    };

    return dynamoDbClient.update(params).promise();
}

/**
 * Remove book from library.
 * @param {string} bookUuid book UUID
 * @returns {Promise<PromiseResult<AWS.DynamoDB.DocumentClient.DeleteItemOutput, AWS.AWSError>>} result
 */
module.exports.delete = async (bookUuid) => {
    const params = {
        TableName: BOOKS_TABLE,
        Key: {
            bookUuid
        }
    }

    return dynamoDbClient.delete(params).promise();
}