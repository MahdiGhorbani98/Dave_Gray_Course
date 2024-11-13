const express = require("express");
const router = express.Router();
const logoutController = require("../controllers/logoutController");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints for authentication and authorization
 */

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       204:
 *         description: Logout successful, refresh token cleared
 *       500:
 *         description: Server error
 */
router.get("/", logoutController.handleLogout);

module.exports = router;
