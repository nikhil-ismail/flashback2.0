require('dotenv').config();

const handleSignin = (req, res, knex, bcrypt, jwt) => {
    const {_email, _password} = req.body;

    if (_email === '' || _password === '') {
        return res.status(400).send("Empty field(s)");
    }

    knex('users').where({
        email: _email
    })
    .select('user_id', 'password')
    .then(rows => {
        bcrypt.compare(_password, rows[0].password)
        .then(response => {
            if (response) {
                console.log("Password matched");
                const user = { id: rows[0].user_id };
                const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

                return res.status(200).json({
                    auth: true,
                    accessToken: accessToken
                })
            } else {
                console.log("Password doesn't match")
                return res.status(400).json({
                    auth: false,
                    message: "Password doesn't match"
                });
            }
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

const handleRegister = (req, res, knex, bcrypt) => {
    const {_name, _email, _password} = req.body;

    knex('users').where({
        'email': _email
    })
    .select('*')
    .then(rows => {
        if (rows.length > 0) {
            console.log('Account already exists');
            return res.status(400).send('Account already exists')
        } else {
            bcrypt.hash(_password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send('Error creating password');
                }

                knex.insert({
                    name: _name,
                    email: _email,
                    password: hash
                })
                .into("users")
                .returning("*")
                .then(rows => {
                    return res.status(200).send('successful');
                })
            })
        }
    })
    .catch(err => console.log(err));
}

module.exports = {
	handleSignin,
	handleRegister
}