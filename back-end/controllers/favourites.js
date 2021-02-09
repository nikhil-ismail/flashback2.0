const handleLove = (req, res, knex) => {
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
}

const favouritesFeed = (req, res, knex) => {
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
}

module.exports = {
	handleLove,
	favouritesFeed
}