const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    Actions
        .get()
        .then(act => {
            console.log("Actions Router", act);
            res.status(200).json(act);
        })
})

router.post('/', (req, res) => {
    const projectId = req.body.project_id;
    if (!projectId) { return res.status(400).json({ errorMessage: "There is no post id for this action" }) }
    Actions
        .insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Error creating new post." })
        })
})

router.put('/:id', validateResId, (req, res) => {
    Actions
        .update(req.params.id, req.body)
        .then(updatedProject => {
            res.status(200).json(updatedProject);
        })
        .catch(err => res.status(500).json({ errorMessage: "Error updating resource." }))
})

router.delete('/:id', validateResId, (req, res) => {
    Actions
        .remove(req.params.id)
        .then(info => res.status(200).json(info))
        .catch(err => res.status(500).json(err, { errorMessage: "Error deleting the project." }))
})

function validateResId(req, res, next) {
    const ResId = req.params.id;
    if (!ResId) {
        return res.status(400).json({ message: "You did not provide a project or action id in the URL" })
    } if (isNaN(ResId)) {
        return res.status(400).json({ message: "ID must be a number" })
    }
    next();
}

module.exports = router;