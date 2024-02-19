const express = require("express");
const router = express.Router();
const { Create, Read, Update, Delete, findOneById } = require("../Controllers/postController");

router.get('/', Read);
router.post('/', Create);
router.put('/:id', Update);
router.delete('/:id', Delete);
router.get("/:id", findOneById);

module.exports = router;
