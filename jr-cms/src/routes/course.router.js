const { Router } = require('express');
const {
  getAllCourses,
  addCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require('../controllers/course.controller');
const adminGuardMiddleware = require('../middleware/adminGuard.middleware');

const courseRouter = Router();

courseRouter.get('/', getAllCourses);
courseRouter.post('/', adminGuardMiddleware, addCourse);
courseRouter.get('/:id', getCourseById);
courseRouter.patch('/:id', updateCourseById);
courseRouter.delete('/:id', deleteCourseById);

module.exports = courseRouter;
