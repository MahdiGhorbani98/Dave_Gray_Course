const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints for authentication and authorization
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Login
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
 *               pwd:
 *                 type: string
 *     responses:
 *       201:
 *         description: Access token generated
 *       403:
 *         description: Forbidden - Access denied
 *       500:
 *         description: Server error
 */
router.post("/", authController.handleLogin);

module.exports = router;
