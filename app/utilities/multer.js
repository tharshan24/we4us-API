const path = require('path');
const cloudinary  = require('./cloudinary')
const multer  = require('multer')
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + './../public/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9 ) + path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })

async function multerCloud (files, callback) {
    const uploader = async (path) => await cloudinary.upload(path, 'Images');

    const urls = [];
    // console.log(files)

    for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
    }

    callback(null,{
        status: 0,
        urls:urls
    });
}

module.exports = {
    upload: upload,
    multerCloud:multerCloud
}