import express from "express";
import {RegisterController} from "../Controllers/register.Controller.js"

const router=express.Router();
//route
router.post("/Register",RegisterController)
export default router;