const multer = require('multer');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
})

const uploadImage = multer({ storage: storage }).single('file');

const handleUpload = (req, res, knex) => {

    uploadImage(req, res, err => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        knex.insert({
            user_id: req.id,
            img_path: req.file.filename,
            who: req.body.who,
            location: req.body.where,
            time_of_memory: req.body.when,
            what: req.body.what,
            favourite: false
        })
        .into("posts")
        .returning("*")
        .then(rows => {
            console.log(rows[0]);
            console.log("File successfully uploaded");
            return res.status(200).send("File successfully uploaded");
        })
        .catch(err => console.log(err));
    })
}

module.exports = {
	handleUpload
}