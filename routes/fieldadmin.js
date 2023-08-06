const express = require('express');
const { Module } = require('module');
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
const session = require('express-session')
const bcrypt = require("bcryptjs");
const {User} = require('../models/users');
const {Fields} = require('../models/fields');
const { stringify } = require('querystring');
router = express.Router()
router.get('/' , async (req,res)=>{
    if(req.session.user.isAdmin){
        let users = await User.find({field: req.params.id}).populate('field').select('-passwordhash');
        res.render('usersfield' , {user:req.session.user , users:users})
    }
    else{
        res.redirect('/' , 500)
    }
})
module.exports = router;