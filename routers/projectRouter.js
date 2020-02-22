const express = require('express');
const router = express.Router();
const Projects = require('../data/helpers/projectModel');
const validateProjectId = require('../middleware/validateProjectId')

router.use(validateProjectId)

router.get('/', (req, res) => {
    Projects
        .get()
        .then(project => {
            console.log("Projects Router", project);
            res.status(200).json(project);
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    Projects
        .get(req.params.id)
        .then(project => {
            if (!project) {
                return res.status(404).json({ message: "No project matching that id in database" })
            }
            console.log("Projects Router", project);
            res.status(200).json(project);
        })
})

router.post('/', (req, res) => {
    Projects
        .insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(err => {
            res.status(500).json({ message: "Something went wrong with your post." })
        })
})

router.put('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Projects
        .update(id, changes)
        .then(updateProject => {
            if (!updateProject) {
                return res.status(400).json({ message: "There is no project matching that id in the database." })
            } res.status(200).json(updateProject);
        })
        .catch(err => res.status(500).json({ errorMessage: "Something went wrong with your update." }))
})

router.delete('/:id', validateProjectId, (req, res) => {
    const { id } = req.params;
    Projects
        .remove(id)
        .then(removed => {
            res.status(200).json(id)
        })
        .catch(error => {
            res.status(500).json({ message: "There was an error deleting info" })
        })
})

module.exports = router;