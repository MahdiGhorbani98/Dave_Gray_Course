const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints for authentication and authorization
 */

/**
 * @swagger
 * /refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: New access token generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: New access token
 *       401:
 *         description: Unauthorized - No refresh token provided
 *       403:
 *         description: Forbidden - Invalid or expired refresh token
 *       500:
 *         description: Server error
 */
router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
