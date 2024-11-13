const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints for authentication and authorization
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: Username of the new user
 *               pwd:
 *                 type: string
 *                 description: Password for the new user
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request - Username and password are required
 *       409:
 *         description: Conflict - Username already exists
 *       500:
 *         description: Server error
 */
router.post("/", registerController.handleNewUser);

module.exports = router;
