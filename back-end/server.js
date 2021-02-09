const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'yourspace'
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/public')));

app.post('/signin', (req, res) => {
    const {username, password} = req.body;

    if (username === '' || password === '') {
        return res.status(400).send("Empty field(s)");
    }

    knex('users').where({
        user_name: username
    })
    .select('user_id', 'password')
    .then(rows => {
        bcrypt.compare(password, rows[0].password)
        .then(response => {
            if (response) {
                console.log("Password matched");
                return res.status(200).send({
                    user_id: rows[0].user_id
                })
            } else {
                console.log("Password doesn't match")
                return res.status(400).send("Password doesn't match");
            }
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
});

app.post('/register', (req, res) => {
    const {username, email, password} = req.body;

    knex('users').where({
        'user_name': username
    })
    .select('*')
    .then(rows => {
        if (rows.length > 0) {
            console.log('Account already exists');
            return res.status(400).send('Account already exists')
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send('Error creating password');
                }

                knex.insert({
                    user_name: username,
                    email: email,
                    password: hash
                })
                .into("users")
                .returning("*")
                .then(rows => {
                    console.log(rows[0]);
                })
            })
            .catch(err => console.log(err));
        }
    })
    .catch(err => console.log(err));
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file');

app.post('/post', (req, res) => {
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
})

app.put('/favourite/:imgurl', (req, res) => {
    knex('posts')
    .where({
        'img_path': req.params.imgurl
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

app.get('/home/:id', (req, res) => {
    knex('posts').where({
        'user_id': req.params.id
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

app.get('/details/:imgUrl', (req, res) => {
    knex('posts').where({
        'img_path': req.params.imgUrl
    })
    .select('who', 'location', 'time_of_memory', 'what', 'favourite')
    .then(paths => {
        return res.json(paths[0]);
    })
    .catch(err => {
        console.log(err);
    });
})

app.get('/favourites/:id', (req, res) => {
    console.log(req.params.id);
    knex('posts').where({
        'user_id': req.params.id,
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

app.put('/edit', (req, res) => {
    knex('posts')
    .where({
        'img_path': req.body.imgUrl.substring(30)
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

app.delete('/delete/:imgUrl', (req, res) => {
    knex('posts')
    .where({
        'img_path': req.params.imgUrl
    })
    .del()
    .then(rows => {
        res.send("Image deleted")
    })
    .catch(err => console.log(err));
})

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
        .select('post_id')
        .then(response => {
            resolve(response);
        })
        .catch(err => reject(err))
    })
}

const getImgUrl = (postId) => {
    return new Promise((resolve, reject) => {
        knex('posts')
        .where({post_id: postId})
        .select('img_path')
        .then(imgPath => {
            resolve(imgPath);
        })
        .catch(err => reject(err))
    })
}

app.get('/search/:id', async (req, res) => {
    const query = req.query.search.split(" ");
    const searchResults = [];

    for (const term of query) {
        const results = await getResults(req.params.id, term)
        results.map(result => {
            searchResults.push(result.post_id);
        })
    }
        
    if (searchResults.length > 0) {
        let frequency = {};

        searchResults.forEach(postId => {
            frequency[postId] = 0;
        })

        const uniqueIds = searchResults.filter(postId => {
            return ++frequency[postId] === 1;
        })

        const sortedUniqueIds = uniqueIds.sort((a, b) => {
            return frequency[b] - frequency[a]
        })

        const imgUrls = [];

        for (const id of sortedUniqueIds) {
            const imgUrl = await getImgUrl(id);
            imgUrl.map(result => {
                imgUrls.push(result.img_path);
            })
        }

        console.log(imgUrls);

        return res.status(200).json(imgUrls);
    }
    return res.status(200).send([]);
})


app.listen(5000, () => console.log(`Server listening on Port 5000`));