const StudentModel = require('../models/student.model');

// db.collection.find()
const getAllStudents = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;
  const students = await StudentModel.find().limit(pageSize).skip(skip).exec();
  res.formatResponse(students);
  // res.formatResponse(students,200,{continuation: undefined});
  // res.formatResponse(students, {pagination: {total: await StudentModel.countDocuments()}});
};

// find({_id: xxx})
const getStudentById = async (req, res, next) => {
  const { id } = req.params;
  const student = await StudentModel.findById(id).exec();
  if (!student) {
    res.formatResponse('Student not found', 404);
    return;
  }
  res.formatResponse(student);
};

const addStudent = async (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  // data validation
  const student = new StudentModel({ firstName, lastName, email });
  await student.save();
  // StudentModel.create()
  res.formatResponse(student, 201);
};
const updateStudentById = async (req, res, next) => {
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
};

const deleteStudentById = async (req, res, next) => {
  const { id } = req.params;
  const student = await StudentModel.findByIdAndDelete(id).exec();
  if (!student) {
    res.formatResponse('Student not found', 404);
    return;
  }
  res.formatResponse(student, 204);
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
};
