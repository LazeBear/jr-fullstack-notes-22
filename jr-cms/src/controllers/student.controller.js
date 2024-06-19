const CourseModel = require('../models/course.model');
const StudentModel = require('../models/student.model');
const createLogger = require('../utils/logger');
const logger = createLogger(__filename);

// db.collection.find()
const getAllStudents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const students = await StudentModel.find()
      .limit(pageSize)
      .skip(skip)
      .exec();
    res.formatResponse(students);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
  // res.formatResponse(students,200,{continuation: undefined});
  // res.formatResponse(students, {pagination: {total: await StudentModel.countDocuments()}});
};

// find({_id: xxx})
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.findById(id)
      .populate('courses', 'name') // graphql
      .exec();
    if (!student) {
      res.formatResponse('Student not found', 404);
      return;
    }
    res.formatResponse(student);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    // data validation
    const student = new StudentModel({ firstName, lastName, email });
    await student.save();
    // StudentModel.create()
    res.formatResponse(student, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};
const updateStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const student = await StudentModel.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true }
    ).exec();
    if (!student) {
      res.formatResponse('Student not found', 404);
      return;
    }
    res.formatResponse(student);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const deleteStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.findByIdAndDelete(id).exec();
    if (!student) {
      res.formatResponse('Student not found', 404);
      return;
    }
    await CourseModel.updateMany(
      { students: student._id },
      // { $pull: { students: {$in: [student._id] } } }
      { $pull: { students: student._id } }
    );
    res.formatResponse(student, 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

// cascade delete

const addStudentToCourse = async (req, res, next) => {
  try {
    // 1. 获取学生和课程的id
    const { studentId, courseId } = req.params;
    // 2. 查找课程和学生，检查是否存在
    const student = await StudentModel.findById(studentId).exec();
    const course = await CourseModel.findById(courseId).exec();
    if (!student || !course) {
      res.formatResponse('Student or course not found', 404);
      return;
    }
    // 3. 添加学生到课程 (可以检查是否关系已经存在)
    // $addToSet
    student.courses.addToSet(courseId);
    course.students.addToSet(studentId);
    // 4. 保存更新
    // trasaction
    await student.save();
    await course.save();
    // 5. 返回
    res.formatResponse(student);
  } catch (e) {
    logger.info(e);
    next(e);
  }
};
const removeStudentFromCourse = async (req, res, next) => {
  try {
    const { studentId, courseId } = req.params;
    const student = await StudentModel.findById(studentId).exec();
    const course = await CourseModel.findById(courseId).exec();
    if (!student || !course) {
      res.formatResponse('Student or course not found', 404);
      return;
    }
    // $pull
    student.courses.pull(courseId);
    course.students.pull(studentId);
    await student.save();
    await course.save();
    res.formatResponse(student, 204);
  } catch (e) {
    logger.info(e);
    next(e);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse,
};
