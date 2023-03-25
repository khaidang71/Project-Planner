const express = require("express");
const project = require("../controllers/project.controllers");

const router = express.Router();

router.route("/")
    .get(project.findAll)
    .post(project.create)
    .delete(project.deleteAll);

router.route("/complete")
    .get(project.findAllComplete);

router.route("/:id")
    .get(project.findOne)
    .put(project.update)
    .delete(project.delete);

module.exports = router;