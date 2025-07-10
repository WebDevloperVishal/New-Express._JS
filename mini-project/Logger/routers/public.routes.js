import { Router } from "express";
import { generateToken } from "../utils/token-utils.js";

// import all controllers
// import SessionController from './app/controllers/SessionController';

const router = Router();

// Add routes
router.get('/generate-token', (req, res) => {
    const token = generateToken();
    res.status(200).json({
        message: "Token genrated plz save it also4 future use",
        data: token
    });
})

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Welcome to home page ✅",
    });
})
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

export default router