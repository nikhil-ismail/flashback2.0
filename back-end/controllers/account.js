const handleSignin = (req, res, knex, bcrypt) => {
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
}

const handleRegister = (req, res, knex, bcrypt) => {
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
}

module.exports = {
	handleSignin,
	handleRegister
}