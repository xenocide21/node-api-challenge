const Projects = require('../data/helpers/projectModel')

const validateProjectId = (req, res, next) => {
    const ResId = req.params.id;
    Projects
        .get(ResId)
        .then( r => {
            r ? next() : res.status(400).json({ message: 'Invalid resource ID' })
        })
        .catch( err => {
            res.status(500).json({err, message: 'Something went wrong' })
        })
}
module.exports = validateProjectId