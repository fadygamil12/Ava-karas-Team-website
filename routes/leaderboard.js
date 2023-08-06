const express = require('express');
const { Module } = require('module');
const dotenv = require('dotenv');
const mongoose  = require('mongoose');
const session = require('express-session')
const bcrypt = require("bcryptjs");
const {User} = require('../models/users');
const {Fields} = require('../models/fields');
const { stringify } = require('querystring');
const fetch = require("node-fetch");
router = express.Router()
router.get('/' , async (req,res)=>{
    if(req.session.user){
        let users = await User.find().sort({rate:-1 }).populate('field');
        if(users){
        users = await users.json()
        res.render('leaderboard' , {user:req.session.user , users:users})
        }
        else{
            res.send(err)
        }
    }
    else{
        res.redirect('/' , 500)
    }
})
module.exports = router;