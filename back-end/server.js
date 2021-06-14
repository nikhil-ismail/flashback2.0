const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const accountRoutes = require('./controllers/account');
const photoRoutes = require('./controllers/photos');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/public/uploads', express.static(path.join(__dirname, '/public/uploads')));

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

app.use('/account', accountRoutes);
app.use('/photos', authenticateToken, photoRoutes);

app.listen(5000, () => console.log(`Server listening on Port 5000`));