const multer = require('multer');

const handleUpload = (req, res, knex) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
    
    const upload = multer({ storage: storage }).single('file');

    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err);
        } else if (err) {
            return res.status(500).json(err);
        }

        knex.insert({
            user_id: req.body.userId,
            img_path: req.file.originalname,
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