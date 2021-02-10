const handleSearch = async (req, res, knex) => {
    
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
}

module.exports = {
	handleSearch
}