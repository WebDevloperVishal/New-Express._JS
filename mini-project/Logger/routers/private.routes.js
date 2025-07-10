import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get('/dashboard', authMiddleware, (req, res) => {
    res.status(200).json({
        data: req.user
    });
});

export default router;

// import all controllers
// import SessionController from './app/controllers/SessionController';

// Add routes
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);