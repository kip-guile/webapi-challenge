const express = require('express')
const Projects = require('../data/helpers/projectModel')

const router = express.Router();

router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.put('/:id', [validateProject], (req, res, next) => {
    const {id} = req.params;
    Projects.update(id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    const {id} = req.params;
    Projects.remove(id)
        .then(() => {
            res.status(200).json({message: 'project has been deleted'}) 
        })
        .catch(next)
})

router.get('/:id/actions', (req, res, next) => {
    const {id} = req.params;
    Projects.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(next)
})

function validateProject(req, res, next) {
    if(Object.keys(req.body).length) {
        if(Object.keys(req.body).includes('name')) {
            if(Object.keys(req.body).includes('description')) {
                if(Object.keys(req.body).includes('completed')) {
                    next()
                } else {
                    res.status(400).json({ message: "missing required completed field" });
                }
            } else {
                res.status(400).json({ message: "missing required description field" });
            }
        } else {
            res.status(400).json({ message: "missing required name field" });
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