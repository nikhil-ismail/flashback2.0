const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

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

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedId) => {
        if (err) {
            return res.sendStatus(403);
        }

        req.id = decodedId.id;
        next();
    })
}

app.use('/', express.static(path.join(__dirname, '/public')));

//User sign in authentication
app.post('/signin', (req, res) => {account.handleSignin(req, res, knex, bcrypt, jwt)})

//User registration and authentication
app.post('/register', (req, res) => {account.handleRegister(req, res, knex, bcrypt)})

//Upload photo to user photo repository
app.post('/post', authenticateToken, (req, res) => {upload.handleUpload(req, res, knex)})

//Setting image as a favourite on double click or heart icon
app.put('/favourite/:imgurl', authenticateToken, (req, res) => {favourites.handleLove(req, res, knex)})

//Getting photos for home feed
app.get('/home', authenticateToken, (req, res) => {home.homeFeed(req, res, knex)})

//Getting details for image modal tags
app.get('/details/:imgUrl', authenticateToken, (req, res) => {modal.tagDetails(req, res, knex)})

//Getting photos for favourites feed
app.get('/favourites', authenticateToken, (req, res) => {favourites.favouritesFeed(req, res, knex)})

//Updating image modal tag details with user input
app.put('/edit', authenticateToken, (req, res) => {modal.handleEdit(req, res, knex)})

//Deleting photo from user repository
app.delete('/delete/:imgUrl', authenticateToken, (req, res) => {modal.handleDelete(req, res, knex)})

//Setting home feed based on search results
app.get('/search', authenticateToken, (req, res) => {search.handleSearch(req, res, knex)})

app.get('/random', authenticateToken, (req, res) => {search.handleRandom(req, res, knex)})

app.listen(5000, () => console.log(`Server listening on Port 5000`));