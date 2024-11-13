const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     responses:
 *       200:
 *         description: Successfully retrieved all employees
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new employee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       403:
 *         description: Forbidden - Admin or Editor role required
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update an existing employee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       403:
 *         description: Forbidden - Admin or Editor role required
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an employee
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       403:
 *         description: Forbidden - Admin role required
 *       500:
 *         description: Server error
 */
router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesController.deleteEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved employee by ID
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
