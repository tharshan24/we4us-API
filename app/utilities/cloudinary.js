const main = require('../config/main');
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: main.CLOUDINARY_CLOUD_NAME,
    api_key: main.CLOUDINARY_API_KEY,
    api_secret: main.CLOUDINARY_API_SECRET
});

const upload = (file, folder) => {
    return new Promise(resolve => {
        console.log("uploading "+file);
        cloudinary.uploader.upload(file, {
                resource_type: "auto",
                folder: folder,
                width: 400,
                crop: `pad`
            }, (err, result) => {
            console.log("upload feedback ", err, result);
            if(err)
            {
                resolve({
                    err:err
                })
            }
            else {
                resolve({
                    url: result.url,
                    id: result.public_id
                })
            }
        })
    })
}

const destroyer = (file, callback) => {
    //return new Promise(resolve => {
        console.log("delete files "+file);
        cloudinary.api.delete_resources(file, (err, result) => {
            // console.log("destroy feedback ", err, result);
            if(err){
                console.log("destroy error ", err)
                callback(err);
            }
            else{
                console.log("destroy success ", result)
                callback(null,result)
            }

        })
    //})
}

// destroyer("Images/nq3nvtfcjykvj1l03qdv");


module.exports = {
    upload:upload,
    destroyer:destroyer
}