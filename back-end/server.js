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
        user: 'neelismail',
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

    knex('users').where({
        user_name: username
    })
    .select('user_id', 'password')
    .then(rows => {
        console.log(rows)
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
        console.log(req.body);
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
    console.log(req);
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

app.get('/feed/:id', (req, res) => {
    knex('posts').where({
        'user_id': parseInt(req.params.id.substring(3))
    })
    .select('img_path', 'who', 'location', 'time_of_memory', 'what', 'favourite')
    .orderBy('post_id', 'desc')
    .then(paths => {
        for (let i = 0; i < paths.length; ++i) {
            if (paths[i].img_path === null) {
                paths.splice(i, 1);
            }
        }
        return res.json(paths);
    })
    .catch(err => {
        console.log(err);
    });
})

app.put('/edit', (req, res) => {
    console.log(req);

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

app.listen(5000, () => console.log(`Server listening on Port 5000`));