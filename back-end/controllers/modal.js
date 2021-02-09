const tagDetails = (req, res, knex) => {
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
}

const handleEdit = (req, res, knex) => {
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
}

const handleDelete = (req, res, knex) => {
    knex('posts')
    .where({
        'img_path': req.params.imgUrl
    })
    .del()
    .then(rows => {
        res.send("Image deleted")
    })
    .catch(err => console.log(err));
}

module.exports = {
	tagDetails,
    handleEdit,
    handleDelete
}