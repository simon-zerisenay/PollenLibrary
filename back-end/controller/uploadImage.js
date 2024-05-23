
const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions,StorageSharedKeyCredential } = require('@azure/storage-blob') ;
const  uuidv4 = require ('uuid');
const blobServiceClient = require("../Database/azure");
const dotenv = require('dotenv');

dotenv.config()

const containerName = process.env.container_name;

const generatePrsignedUrl  = async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }
  
    const { fileName } = req.body;
  
    try {
      const containerClient = blobServiceClient.getContainerClient(containerName);
      console.log('container_client',containerClient)
      const blobName = `${new Date()}-${fileName}`;
      const blobClient = containerClient.getBlobClient(blobName);
      console.log('blob_client',blobClient)

      const sharedKeyCredential = new StorageSharedKeyCredential(
        process.env.AZURE_STORAGE_ACCOUNT_NAME,
        process.env.AZURE_STORAGE_ACCOUNT_KEY
      );
  
      const permissions = new BlobSASPermissions();
      permissions.write = true;
      permissions.create = true;
  
      const sasOptions = {
        containerName: containerName,
        blobName: blobName,
        permissions: permissions,
        expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour from now
      };
  
      const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
      const presignedUrl = `${blobClient.url}?${sasToken}`;
      const imageUrl = blobClient.url;
      
      // console.log(presignedUrl)
      // console.log(imageUrl)
      res.status(200).json({ presignedUrl, imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error generating presigned URL' });
    }
  };

  module.exports = generatePrsignedUrl;





