const homeFeed = (req, res, knex) => {
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
}

module.exports = {
	homeFeed
}