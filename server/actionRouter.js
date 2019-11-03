const express = require('express')
const Actions = require('../data/helpers/actionModel')

const router = express.Router();

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.put('/:id', [validateAction], (req, res, next) => {
    const {id} = req.params;
    Actions.update(id, req.body)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    Actions.remove(id)
        .then(() => {
            res.status(200).json({message: 'project has been deleted'}) 
        })
        .catch(next)
})



function validateAction(req, res, next) {
    if(Object.keys(req.body).length) {
        if(Object.keys(req.body).includes('project_id')) {
            if(Object.keys(req.body).includes('description')) {
                if(Object.keys(req.body).includes('notes')) {
                    if(Object.keys(req.body).includes('completed')) {
                        next()
                    } else {
                        res.status(400).json({ message: "missing required completed field" });
                    }
                } else {
                    res.status(400).json({ message: "missing required notes field" });
                }
            } else {
                res.status(400).json({ message: "missing required descripton field" });
            }
        } else {
            res.status(400).json({ message: "missing required project_id field" });
        }
    }
}

router.use((error, req, res) => {
    res.status(500).json({
        file: 'userRouter',
        method: 'req.method',
        url: req.url,
        message: error.message
    })
})

module.exports = router;