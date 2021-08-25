const main = require('../config/main');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: main.CLOUDINARY_CLOUD_NAME,
    api_key: main.CLOUDINARY_API_KEY,
    api_secret: main.CLOUDINARY_API_SECRET
});

const upload = (file, folder) => {
    return new Promise(resolve => {
        // console.log(file);
        cloudinary.uploader.upload(file, {
                resource_type: "auto",
                folder: folder,
                width: 400,
                crop: `pad`
            }, (err, result) => {
            console.log(result);
            resolve({
                url: result.url,
                id: result.public_id
            })
        })
    })
}

module.exports = {
    upload:upload
}