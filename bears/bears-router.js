const db = require('./bears-model')

const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        const bears = await db.find()
        res.status(200).json(bears)
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bears'
        })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const bears = await db.findById(req.params.id)
        if (bears) {
            res.status(200).json (bears)
        } else {
            res.status(404).json({
                message: 'The bear with the specified ID does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving bear'
        })
    }
})

router.post('/', async (req, res) => {
    try {
        if(req.body.name) {
            const bear = await db.add(req.body)
            res.status(201).json({bear})
        } else {
            res.status(400).json({
                message: 'Please provide name of the bear'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error adding bear'
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        if(req.body.name) {
            const bear = await db.update(req.params.id, req.body)            
            if (bear) {
                res.status(200).json(bear)
            } else {
                res.status(404).json({
                    message: 'The bear with the specified ID does not exist'
                })
            }
        } else {
            res.status(400).json({
                message: 'Please provide name of the bear'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating bear'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const bear = await db.remove(req.params.id)
        if(bear) {
            res.status(204).end()
        } else {
            res.status(404).json({
                message: 'The bear with the specified ID does not exist'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting bear'
        })
    }
})

module.exports = router