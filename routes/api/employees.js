const express = require("express");
const router = express.Router();
const employeesController = require("../../controllers/employeesController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

/**
 * @swagger
 * tags:
 *   - name: Employees
 *     description: Endpoints for managing employees
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all employees
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
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
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the employee to update
 *                 example: "609c1f02e1234567890abcde"
 *               firstname:
 *                 type: string
 *                 description: New first name of the employee
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 description: New last name of the employee
 *                 example: "Doe"
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Bad request - ID parameter is required
 *       204:
 *         description: No content - No employee matches the provided ID
 *       403:
 *         description: Forbidden - Admin or Editor role required
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the employee to delete
 *                 example: "609c1f02e1234567890abcde"
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       400:
 *         description: Bad request - ID parameter is required
 *       204:
 *         description: No content - No employee matches the provided ID
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
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
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
