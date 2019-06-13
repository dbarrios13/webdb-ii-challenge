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
    return db('zoos')
}

function findById (id) {
    return db('zoos')
        .where({ id })
        .first()
}

function add (zoo) {
    return db('zoos')
        .insert(zoo)
        .then(ids => {
            const [id] = ids
            return findById(id)
        })
}

function update (id, changes) {
    return db('zoos')
        .where({ id })
        .update(changes)
        .then(() => {
            return db('zoos')
                .where({ id })
                .first()
        })
}

function remove(id) {
    return db('zoos')
        .where({ id })
        .del()
}