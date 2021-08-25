var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        console.log('inside destination');
        callback(null, __dirname + './../../../../../../app/uploads/chat');
    },
    filename: function (req, file, callback) {
        console.log("inside filename");
        callback(null, file.fieldname + '-' + Date.now()+'-'+(Math.random()*100000000000) + path.extname(file.originalname));
    }
});
var upload = multer({ storage : storage}).single('file');

function uploadFile(req,res) {
    console.log("start upload");
    upload(req, res, function (err) {
        console.log("inside upload");
        if (err) {
            console.log("err");
            console.log(err);
            Response.notFound(res,CONSTANTS.messages.NOT_AVALIBLE_DATA);
        }
        else{
            console.log("sucess");
            console.log(req.file.filename);
            Response.success(res,{filename:global.__domain+'/cdn/chat/'+req.file.filename},CONSTANTS.messages.SUCCESS);
        }

    });
}