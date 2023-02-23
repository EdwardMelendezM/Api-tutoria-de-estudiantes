const mongoose = require('mongoose');

// Student model
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthdate: { type: Date, required: true },
  photo: { type: String, },
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
});

const StudentModel = mongoose.model('students', StudentSchema);

// Modelo de Tutor
const tutorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  birthdate: { type: Date, required: true },
  photo: { type: String, },


});

const TutorModel = mongoose.model('tutors', tutorSchema);

// sesion model
const sessionSchema = new mongoose.Schema({
  id_student: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
  id_tutor: { type: mongoose.Schema.Types.ObjectId, ref: 'tutors', required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  comment: { type: String },
});
const SessionModel = mongoose.model('session', sessionSchema);



// booking model
const reserveSchema = new mongoose.Schema({
  id_sesion: { type: mongoose.Schema.Types.ObjectId, ref: 'session', required: true },
  date_reserve: { type: Date, required: true },
});

const ReserveModel = mongoose.model('reserve', reserveSchema);



module.exports = { StudentModel, TutorModel, SessionModel, ReserveModel };




const express = require('express');
const router = express.Router();
const { StudentModel, TutorModel, SessionModel, ReserveModel } = require('./models');

// Obtener todos los estudiantes
router.get('/estudiantes', async (req, res) => {
  const estudiantes = await StudentModel.find();
  res.json(estudiantes);
});

// Obtener todos los tutores
router.get('/tutores', async (req, res) => {
  const tutores = await TutorModel.find();
  res.json(tutores);
});

// Obtener todas las sesiones con sus referencias
router.get('/sesiones', async (req, res) => {
  const sesiones = await SessionModel.find().populate('id_student').populate('id_tutor');
  res.json(sesiones);
});

// Obtener todas las reservas con sus referencias
router.get('/reservas', async (req, res) => {
  const reservas = await ReserveModel.find().populate('id_session');
  res.json(reservas);
});

// Agregar una nueva reserva
router.post('/reservas', async (req, res) => {
  const { id_session, date_reserve } = req.body;

  try {
    const reserva = new ReserveModel({ id_session, date_reserve });
    await reserva.save();
    res.json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar la reserva');
  }
});



// Obtener todas las sesiones con sus referencias y sus reservas
router.get('/sesiones', async (req, res) => {
  const sesiones = await SessionModel.find().populate('id_estudiante').populate('id_tutor');
  const sesiones_con_reservas = await Promise.all(sesiones.map(async (sesion) => {
    const reservas = await ReserveModel.find({ id_sesion: sesion._id }).populate('id_sesion');
    return {
      ...sesion.toObject(),
      reservas: reservas.map((reserva) => reserva.toObject()),
    };
  }));
  res.json(sesiones_con_reservas);
});


/**
 *
 * POST / reservas HTTP / 1.1
 * Host: localhost: 3000
 * Content - Type: application / json

{
  "id_sesion": "6036a8d232bcf04290544175",
    "fecha_reserva": "2023-02-24T00:00:00.000Z"
}
 */

module.exports = router;