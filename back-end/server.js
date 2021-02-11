const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

const account = require('./controllers/account');
const favourites = require('./controllers/favourites');
const upload = require('./controllers/upload');
const home = require('./controllers/home');
const modal = require('./controllers/modal');
const search = require('./controllers/search');

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

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/public')));

//User sign in authentication
app.post('/signin', (req, res) => {account.handleSignin(req, res, knex, bcrypt)})

//User registration and authentication
app.post('/register', (req, res) => {account.handleRegister(req, res, knex, bcrypt)})

//Upload photo to user photo repository
app.post('/post', (req, res) => {upload.handleUpload(req, res, knex)})

//Setting image as a favourite on double click or heart icon
app.put('/favourite/:imgurl', (req, res) => {favourites.handleLove(req, res, knex)})

//Getting photos for home feed
app.get('/home/:id', (req, res) => {home.homeFeed(req, res, knex)})

//Getting details for image modal tags
app.get('/details/:imgUrl', (req, res) => {modal.tagDetails(req, res, knex)})

//Getting photos for favourites feed
app.get('/favourites/:id', (req, res) => {favourites.favouritesFeed(req, res, knex)})

//Updating image modal tag details with user input
app.put('/edit', (req, res) => {modal.handleEdit(req, res, knex)})

//Deleting photo from user repository
app.delete('/delete/:imgUrl', (req, res) => {modal.handleDelete(req, res, knex)})

//Setting home feed based on search results
app.get('/search/:id', (req, res) => {search.handleSearch(req, res, knex)})

app.get('/random/:id', (req, res) => {
    knex('posts')
    .where({user_id: req.params.id})
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

app.listen(5000, () => console.log(`Server listening on Port 5000`));