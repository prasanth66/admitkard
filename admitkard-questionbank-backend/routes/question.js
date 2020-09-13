const express=require('express');
const mongoose=require('mongoose');
const questionController=require('../controllers/question_controller');
const router=express.Router();


router.post('/add',questionController.addQuestion);
router.get('/fetch',questionController.fetchQuestion);
module.exports=router;