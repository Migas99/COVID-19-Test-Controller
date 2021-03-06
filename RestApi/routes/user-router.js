const express = require('express');
const router = express.Router();
const userController = require("../controllers/user-controller");
const { authorizeBasedOnRoles, authorizeBasedOnRolesAndUserId } = require('../middlewares/authorize');

/*Obter todos os users*/
router.get('/', authorizeBasedOnRoles(['TECHNICIAN', 'ADMIN']), userController.getAllUsers);

/*Obter a lista de users infetados*/
router.get('/infected', authorizeBasedOnRoles(['TECHNICIAN', 'ADMIN']), userController.getAllInfectedUsers);

/*Obter o número de infetados e numero de users*/
router.get('/usersInfo', authorizeBasedOnRoles(['USER', 'TECHNICIAN', 'ADMIN']), userController.getUsersInfo);

/*Obter todos os técnicos*/
router.get('/technicians', authorizeBasedOnRoles(['ADMIN']), userController.getAllTechnicians);

/*Obter o perfil do user autenticado*/
router.get('/profile', authorizeBasedOnRoles(['USER', 'TECHNICIAN', 'ADMIN']), userController.getMyProfile);

/*Obter um user, usando o seu ID*/
router.get('/:userId', authorizeBasedOnRolesAndUserId(['TECHNICIAN', 'ADMIN']), userController.getByIdUser);

/*Realizar o Login*/
router.post('/login', userController.login);

/*Realizar o registo de um user normal*/
router.post('/register', userController.createUser);

/*Realizar o registo de um técnico*/
router.post('/technician/register', authorizeBasedOnRoles(['ADMIN']), userController.createTechnician);

/*Atualizar um user*/
router.put('/:userId', authorizeBasedOnRolesAndUserId(['ADMIN']), userController.updateUser);

/*Eliminar um user*/
router.delete('/:userId', authorizeBasedOnRolesAndUserId(['ADMIN']), userController.deleteUser);

module.exports = router;