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
    return null
}

function findById (id) {
    return null
}

function add (name) {
    return null
}

function update (id, changes) {
    return null
}

function remove(id) {
    return null
}