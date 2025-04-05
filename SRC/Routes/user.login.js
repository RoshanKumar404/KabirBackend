import express from "express";
import { Login } from "../Controllers/logIn.controller.js";
const router= express.Router();

router.get('/Login',Login)