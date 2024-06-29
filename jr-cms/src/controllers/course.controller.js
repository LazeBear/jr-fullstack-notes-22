const CourseModel = require('../models/course.model');
const StudentModel = require('../models/student.model');
const createLogger = require('../utils/logger');
const { addCourseSchema } = require('../validations/course.validation');
const logger = createLogger(__filename);

/**
 * 1. callback
 *    CourseModel.find().exec((err, courses)=>{
 *      if (err) {
 *        res.status(500).json({error: "xxxx"})
 *      }
 *      // handle success response
 *    })
 * 2. promise
 *    CourseModel.find().exec().then((courses) => {}).catch((err)=> res.status(500)....)
 * 3. async await
 *    try {
 *      const courses = await CourseModel.find().exec();
 *    } catch (e) {
 *      res.status(500)...
 *    }
 *
 * 4. express-async-errors
 */
// curring function
// higher order function
// const catchAll = (routeHandler) => {
//   return async (req, res, next) => {
//     try {
//       await routeHandler(req, res, next);
//     } catch(e) {
//       next(e);
//     }
//   }
// }
// router.get('/v1/users', catchAll(addUser));

// db.collection.find()
const getAllCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    // req.query.sort -> ?sort=-name
    const courses = await CourseModel.find()
      .limit(pageSize)
      .skip(skip)
      // .sort('xxx','asc')
      .exec();
    res.formatResponse(courses);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(id).exec();
    if (!course) {
      res.formatResponse('Course not found', 404);
      return;
    }
    res.formatResponse(course);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addCourse = async (req, res, next) => {
  try {
    // const { code, name, description } = req.body;
    // const schema = Joi.object({
    //   name: Joi.string().min(2).max(255).required(),
    //   description: Joi.string().optional(),
    //   // 字母+数字
    //   // comp101 /
    //   // 1234    x
    //   // 101comp x
    //   code: Joi.string()
    //     .regex(/^[a-zA-Z]+[0-9]+$/)
    //     .message('Expecting something like COMP101')
    //     .uppercase()
    //     .required(),
    // });

    const validatedBody = await addCourseSchema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });
    // const Course = new CourseModel({ _id: code, name, description });
    const course = new CourseModel(validatedBody);
    await course.save();
    res.formatResponse(course, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const updateCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const course = await CourseModel.findByIdAndUpdate(
      id,
      { name, description },
      // $set, $unset
      { new: true }
    ).exec();
    if (!course) {
      res.formatResponse('Course not found', 404);
      return;
    }
    res.formatResponse(course);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findByIdAndDelete(id).exec();
    if (!course) {
      res.formatResponse('Course not found', 404);
      return;
    }
    await StudentModel.updateMany(
      { courses: course._id },
      {
        $pull: {
          courses: course._id,
        },
      }
    );
    res.formatResponse(course, 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
};
