const db = require('./zoo-model')

const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        const zoos = await db.find()
        res.status(200).json(zoos)
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving zoos'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const zoo = await db.findById(req.params.id)
        if(zoo) {
            res.status(200).json(zoo)
        } else {
            res.status(404).json({
                message: 'The zoo with the specified ID does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving zoo'
        })
    }
})

router.post('/', async (req, res) => {
    try {
        if(req.body.name) {
            const zoo = await db.add(req.body)
            res.status(201).json({zoo})
        } else {
            res.status(400).json({
                message: 'Please provide name of the zoo'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error adding zoo'
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        if(req.body.name) {
            const zoo = await db.update(req.params.id, req.body)            
            if (zoo) {
                res.status(200).json(zoo)
            } else {
                res.status(404).json({
                    message: 'The zoo with the specified ID does not exist'
                })
            }
        } else {
            res.status(400).json({
                message: 'Please provide name of the zoo'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating zoo'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const zoo = await db.remove(req.params.id)
        if(zoo) {
            res.status(204).end()
        } else {
            res.status(404).json({
                message: 'The zoo with the specified ID does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting zoo'
        })
    }
})

module.exports = router