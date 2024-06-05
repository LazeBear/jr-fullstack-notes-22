const TaskModel = require('../models/task');

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: Object
 *      required:
 *        - name
 *      properties:
 *        id:
 *          type: number
 *          description: auto generated unique identifier
 *        name:
 *          type: string
 *        completed:
 *          type: boolean
 *      example:
 *        id: 1
 *        name: task 1
 *        completed: true
 */
const getAllTasks = (req, res, next) => {
  const { name, completed } = req.query;
  const result = TaskModel.getAllTasks(name, completed);
  res.json({ data: result });
};

/**
 * @swagger
 * /v1/tasks:
 *  post:
 *    summary: create new task
 *    tags: [Task]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Task'
 *    responses:
 *      201:
 *        descritpion: added successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Task'
 */
const addTask = (req, res, next) => {
  const { name } = req.body;
  // validation library
  // fail fast
  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'name is not valid' });
    return;
  }
  const newTask = TaskModel.addTask(name);

  res.status(201).json(newTask);
};

const updateTask = (req, res, next) => {
  const { id } = req.params;
  const { name, completed } = req.body;
  try {
    const task = TaskModel.updateTaskById(id, { name, completed });
    res.json({ data: task });
  } catch (e) {
    next(e);
  }
};

const deleteTask = (req, res, next) => {
  const { id } = req.params;
  try {
    TaskModel.deleteTaskById(id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const getTaskById = (req, res, next) => {
  const { id } = req.params;
  try {
    const task = TaskModel.getTaskById(id);
    res.json({ data: task });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  updateTask,
  addTask,
  deleteTask,
};
