import express from "express";
import { Login } from "../Controllers/logIn.controller.js";
const router= express.Router();

router.post("/login",Login)
export default router;