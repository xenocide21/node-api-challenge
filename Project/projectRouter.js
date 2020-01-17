const express = require("express");

// const projectDB = require("../data/helpers/projectModel.js");
const actionDB = require("../data/helpers/actionModel.js");

const router = express.Router();

router.get("/test", (req, res) => {
    res.send(`
      
        <p>Welcome to the projectRouter API</p>
      `);
});
router.get("/", (req, res) => {

});

router.get("/:id", (req, res) => {

});

router.delete("/:id", (req, res) => {

});

router.put("/:id", (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

}

module.exports = router;