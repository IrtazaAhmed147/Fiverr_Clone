import express from "express";
import { deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// router.delete("/:id", (req, res)=> {

// });
router.get("/:id", deleteUser);

export default router;