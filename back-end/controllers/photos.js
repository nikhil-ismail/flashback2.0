const express = require('express');
const router = express.Router();
require('dotenv').config();

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

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file);
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        let uniqueFileName = '';
        if (fileName.endsWith(extension)) {
            uniqueFileName = `${Date.now()}-${fileName}`;
        } else {
            uniqueFileName = `${Date.now()}-${fileName}.${extension}`;
        }
        cb(null, uniqueFileName);
    }
})

const upload = multer({ storage: storage });
const multipleUpload = upload.fields([{ name: 'photos', maxCount: 100 }])

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        port: '5432',
        database: 'yourspace'
    }
});

router.get('/home', (req, res) => {
    knex('posts').where({
        'user_id': req.id
    })
    .select('img_path')
    .orderBy('post_id', 'desc')
    .then(response => {
        const paths = response.map(path => {
            return path.img_path;
        })
        return res.json(paths);
    })
    .catch(err => {
        console.log(err);
    });
})

router.get('/search', async (req, res) => {
    const getResults = (id, term) => {
        return new Promise((resolve, reject) => {
            knex('posts')
            .where({user_id: id})
            .andWhere(function() {
                this.where('who', 'ilike', `%${term}%`)
                .orWhere('location', 'ilike', `%${term}%`)
                .orWhere('time_of_memory', 'ilike', `%${term}%`)
                .orWhere('what', 'ilike', `%${term}%`)
            })
            .select('img_path')
            .then(response => {
                resolve(response);
            })
            .catch(err => reject(err))
        })
    }
    
    const query = req.query.search.split(" ");
    const searchResults = [];

    for (const term of query) {
        const results = await getResults(req.id, term)
        results.map(result => {
            searchResults.push(result.img_path);
        })
    }
        
    if (searchResults.length > 0) {

        let posts = {};
        let paths = [];
        for (let i = 0; i < searchResults.length; i++) {
            if (posts[searchResults[i]] === undefined) {
                posts[searchResults[i]] = 1;
                paths.push(searchResults[i]);
            } else {
                posts[searchResults[i]] = posts[searchResults[i]] + 1;
            }
        }

        const sortedPaths = paths.sort((a, b) => {
            return posts[b] - posts[a]
        })

        return res.status(200).send(sortedPaths);
    }

    return res.status(200).send([]);
})

router.get('/favourites', (req, res) => {
    knex('posts').where({
        'user_id': req.id,
        'favourite': true
    })
    .select('img_path', 'who', 'location', 'time_of_memory', 'what', 'favourite')
    .orderBy('post_id', 'desc')
    .then(response => {
        const paths = response.map(path => {
            return path.img_path;
        })
        return res.json(paths);
    })
    .catch(err => {
        console.log(err);
    });
})

router.get('/random', (req, res) => {
    knex('posts')
    .where({user_id: req.id})
    .select('img_path')
    .then(paths => {
        const randomMemories = paths.sort(() => {
            return 0.5 - Math.random()
        })

        if (randomMemories.length > 6) {
            return res.status(200).json(randomMemories.slice(0, 6).map(imgUrl => {
                return imgUrl.img_path;
            }));
        } else {
            return res.status(200).json(randomMemories.map(imgUrl => {
                return imgUrl.img_path;
            }));
        }
    })
    .catch(err => console.log(err))
})

router.get('/details/:imgUrl', (req, res) => {
    knex('posts').where({
        'img_path': `${req.protocol}://${req.get('host')}/public/uploads/${req.params.imgUrl}`
    })
    .select('who', 'location', 'time_of_memory', 'what', 'favourite')
    .then(paths => {
        return res.json(paths[0]);
    })
    .catch(err => {
        console.log(err);
    });
})

router.post('/', multipleUpload, (req, res) => {
    console.log(req.files)
    if (req.files) {
        for (let i = 0; i < req.files.photos.length; i++) {
            knex.insert({
                user_id: req.id,
                img_path: `${req.protocol}://${req.get('host')}/${req.files.photos[i].path}`,
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
            })
            .catch(err => console.log(err));
        }
        return res.status(200).send('files successfully uploaded');
    }
    return res.status(400).send('error occurred while uploading images');
})

router.put('/details/:imgUrl', (req, res) => {
    knex('posts')
    .where({
        'img_path': `${req.protocol}://${req.get('host')}/public/uploads/${req.params.imgUrl}`
    })
    .update({
        'who': req.body.who,
        'location': req.body.where,
        'time_of_memory': req.body.when,
        'what': req.body.what
    }, ['who', 'location', 'time_of_memory', 'what'])
    .then(rows => {
        return res.json(rows[0]);
    })
    .catch(err => {
        console.log(err);
    })
})

router.put('/favourite/:imgUrl', (req, res) => {
    knex('posts')
    .where({
        'img_path': `${req.protocol}://${req.get('host')}/public/uploads/${req.params.imgUrl}`
    })
    .update({
        favourite: req.body.favourite
    }, ['favourite'])
    .then(row => {
        return res.json(row[0].favourite);
    })
    .catch(err => {
        console.log(err);
    })
})

router.delete('/:imgUrl', (req, res) => {
    knex('posts')
    .where({
        'img_path': `${req.protocol}://${req.get('host')}/public/uploads/${req.params.imgUrl}`
    })
    .del()
    .then(rows => {
        res.send("Image deleted")
    })
    .catch(err => console.log(err));
})

module.exports = router;