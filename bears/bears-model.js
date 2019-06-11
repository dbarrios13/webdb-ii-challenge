const knex = require('knex')

const config = {
    client: 'sqlite3',
    connection: {
        filename: './data/lambda.db3'
    },
    useNullAsDefault: true
}

const db = knex(config)

module.exports = {
    find,
    findById,
    add,
    update,
    remove
}

function find () {
    return db('bears')
}

function findById (id) {
    return db('bears')
        .where({ id })
        .first()
}

function add (bear) {
    return db('bears')
        .insert(bear)
        .then(ids => {
            const [id] = ids
            return findById(id)
        })
}

function update (id, changes) {
    return db('bears')
        .where({ id })
        .update(changes)
        .then(() => {
            return db('bears')
                .where({ id })
                .first()
        })
}

function remove(id) {
    return db('bears')
        .where({ id })
        .del()
}