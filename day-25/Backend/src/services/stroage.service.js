const imageKit = require('@imagekit/imagekit');

const client = new imageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
 
}); 

async function uploadImage(file) {
    try {
        const response = await client.upload({
            file: file.buffer,
            fileName: file.originalname,
        });
        return response.url;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }

    
}
module.exports = {
    uploadImage,
}   