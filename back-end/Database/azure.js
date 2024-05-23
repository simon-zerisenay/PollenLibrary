
const { BlobServiceClient } = require("@azure/storage-blob");
const dotenv = require("dotenv");
dotenv.config()



const connStr = process.env.connnection_string

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);





module.exports = blobServiceClient;