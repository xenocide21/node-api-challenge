//  function validateResId(req, res, next) {
//     const ResId = req.params.id;
//     if (!ResId) {
//         return res.status(400).json({ message: "You did not provide a project or action id in the URL" })
//     } if (isNaN(ResId)) {
//         return res.status(400).json({ message: "ID must be a number" })
//     }
//     next();
// }

const Actions = require('../data/helpers/actionModel')

const validateResId = (req, res, next) => {
    const ResId = req.params.id;
    Actions
        .get(ResId)
        .then( r => {
            r ? next() : res.status(400).json({ message: 'invalid resource id' })
        })
        .catch( err => {
            res.status(400).json({err, message: 'invalid resource id' })
        })
}
module.exports = validateResId