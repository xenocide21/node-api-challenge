const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel');
const validateResId = require('../middleware/validateResId')

router.use(validateResId)
router.get('/', (req, res) => {
    Actions
        .get()
        .then(act => {
            console.log("Actions Router", act);
            res.status(200).json(act);
        })
})

router.get('/:id', validateResId, (req, res) => {
    Actions
        .get(req.params.id)
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

module.exports = router;