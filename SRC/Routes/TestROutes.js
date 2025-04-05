import express from 'express'
import { testcontroller } from '../Controllers/testContrller.js';
//router object
const router= express.Router();
//routes
router.get('/test',testcontroller)

export default router;


// import express from 'express'
// const router=express.Router()

// router.route('/test',)
// export default router;