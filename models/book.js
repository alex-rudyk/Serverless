const { dynamoDbClient } = require(".");
const { createSetUpdateParams } = require("../helpers/dbHelpers");
const { BOOKS_TABLE } = process.env;

module.exports.getAll = async () => {
    const params = {
        TableName: BOOKS_TABLE
    }

    return dynamoDbClient.scan(params).promise();
}

module.exports.get = async (bookUuid) => {
    const params = {
        TableName: BOOKS_TABLE,
        Key: {
            bookUuid
        }
    }

    return dynamoDbClient.get(params).promise();
}

module.exports.create = async (data) => {
    const params = {
        TableName: BOOKS_TABLE,
        Item: {
            ...data
        },
    };

    return dynamoDbClient.put(params).promise();
}

module.exports.update = async (data) => {
    const { bookUuid, ...bookData } = data;

    const params = {
        ...createSetUpdateParams(BOOKS_TABLE, { bookUuid }, bookData),
        ReturnValues: 'ALL_NEW'
    };

    return dynamoDbClient.update(params).promise();
}

module.exports.delete = async (bookUuid) => {
    const params = {
        TableName: BOOKS_TABLE,
        Key: {
            bookUuid
        }
    }

    return dynamoDbClient.delete(params).promise();
}