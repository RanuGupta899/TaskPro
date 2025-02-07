const express = require('express');
const { createToDos, getTodos, deleteToDo, updateToDo, editToDo } = require('../controllers/todoController'); // Import controllers
const router = express.Router();

router.post('/create', createToDos);

router.get('/', getTodos);

router.delete('/delete', deleteToDo);
router.put('/update-status', updateToDo);
router.put('/edit', editToDo);

module.exports = router;
