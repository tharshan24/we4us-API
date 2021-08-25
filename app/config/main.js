require('dotenv').config()
const env = process.env;

module.exports ={
    host: env.URL,
    user: env.USERNAME,
    password: env.PASSWORD,
    database: env.NAME,

    password_secret : env.password_secret,
    domain: env.domain,
    key: env.key,

    CLOUDINARY_CLOUD_NAME: env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: env.CLOUDINARY_API_SECRET
}